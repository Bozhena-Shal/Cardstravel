import { Link, Outlet } from 'react-router-dom'
import { getAllCardsRoute, getSignInRoute, getSignUpRoute } from '../../lib/routes'
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
          <li className={css.item}>
            <Link className={css.link} to={getSignUpRoute()}>
              Sing Up
            </Link>
          </li>
          <li className={css.item}>
            <Link className={css.link} to={getSignInRoute()}>
              Sing In
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
