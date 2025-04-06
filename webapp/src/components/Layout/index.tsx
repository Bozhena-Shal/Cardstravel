import { Link, Outlet } from 'react-router-dom'
import { getAllCardsRoute } from '../../lib/routes'
import { getNewCardRoute } from '../../lib/routes'
import css from './index.module.scss'

export const Layout = () => {
  return (
    <div className={css.layout}>
      <div className={css.navigation}>
        <div className={css.logo}>CardTravel</div>
        <ul className={css.menu}>
          <li className={css.item}>
            <Link className={css.link} to={getAllCardsRoute()}>
              All Cards
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getNewCardRoute()}>
              Add card
            </Link>
          </li>
        </ul>
      </div>
      <div className={css.content}>
        <Outlet />
      </div>
    </div>
  )
}
