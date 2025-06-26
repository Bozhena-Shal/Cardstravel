import { zGetCardsTrpcInput } from '@cardstravel/backend/src/router/card/getCards/input'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounceValue } from 'usehooks-ts'
import { Alert } from '../../../components/Alert'
import { Input } from '../../../components/Input'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { getViewCardsRoute } from '../../../lib/routes'

import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const AllCardsPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetCardsTrpcInput.pick({ search: true }),
  })
  const debouncedValue = useDebounceValue(formik.values.search, 300)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getCards.useInfiniteQuery(
      {
        search: debouncedValue[0],
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  if (!data) {
    return <span>No data available.</span>
  }

  return (
    <Segment title="All Cards">
      <div className={css.filter}>
        <Input maxWidth={'100%'} label="Search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].cards.length ? (
        <Alert color="brown">Nothing found by search</Alert>
      ) : (
        <div className={css.cards}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage()
              }
            }}
            hasMore={hasNextPage}
            loader={
              <div className={css.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
          >
            {data.pages
              .flatMap((page) => page.cards)
              .map((card) => (
                <div className={css.card} key={card.nick}>
                  <Segment
                    size={2}
                    title={
                      <Link className={css.cardLink} to={getViewCardsRoute({ cardNick: card.nick })}>
                        {card.name}
                      </Link>
                    }
                    description={card.description}
                  >
                    Likes: {card.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  )
}
