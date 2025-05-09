import cn from 'classnames'
import { Link } from 'react-router-dom'
import css from './index.module.scss'

// Определяем тип пропсов для Button
export type ButtonProps = {
  children: React.ReactNode
  loading?: boolean
  type?: 'button' | 'submit' | 'reset' // Добавляем для гибкости
  disabled?: boolean // Добавляем явно
}

// Основной компонент Button
export const Button = ({ children, loading = false, type = 'submit', disabled = false }: ButtonProps) => {
  return (
    <button
      className={cn({
        [css.button]: true,
        [css.disable]: loading || disabled,
      })}
      type={type}
      disabled={loading || disabled}
    >
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export const LinkButton = ({ children, to }: { children: React.ReactNode; to: string }) => {
  return (
    <Link className={cn({ [css.button]: true })} to={to}>
      {children}
    </Link>
  )
}

// Определяем тип пропсов для LinkButton
export type LinkButtonProps = {
  children: React.ReactNode
  to: string
}
