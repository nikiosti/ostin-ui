import {FC, HTMLAttributes, useRef} from 'react'
import {useButton} from '../../hooks'
import {ButtonCssVariables, ButtonProps} from './types'

import classes from './Button.module.css'

const getVariantStyles = (variant: ButtonProps['variant']): ButtonCssVariables => {
  switch (variant) {
    case 'filled':
      return {}
    case 'light':
      return {
        '--button-bg': 'var(--ui-primary-color-light)',
        '--button-bg-hover': 'var(--ui-primary-color-light-hover)',
        '--button-color': 'var(--ui-primary-color)',
      }
    case 'outline':
      return {
        '--button-border': '1px solid var(--ui-primary-color)',
        '--button-color': 'var(--ui-primary-color-9)',
        '--button-bg': 'transparent',
        '--button-bg-hover': 'var(--ui-primary-color-light-hover)',
      }
    case 'subtle':
      return {
        '--button-color': 'var(--ui-primary-color)',
        '--button-bg': 'transparent',
        '--button-bg-hover': 'var(--ui-primary-color-light-hover)',
      }
    case 'default':
      return {
        '--button-border': '2px solid var(--ui-primary-color-2)',
        '--button-color': 'var(--ui-primary-color-7)',
        '--button-bg': 'none',
        '--button-bg-hover': 'var(--ui-primary-color-1)',
      }
    default:
      return {}
  }
}

export const Button: FC<HTMLAttributes<HTMLButtonElement> & ButtonProps> = (props) => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const {children, variant, style} = props

  const variantStyles = getVariantStyles(variant)
  const buttonStyles: ButtonCssVariables = {...variantStyles, ...style}

  const {buttonProps} = useButton({ref, props})

  return (
    <button ref={ref} className={classes.root} style={buttonStyles} {...buttonProps}>
      {typeof children === 'string' ? <span className={classes.label}>{children}</span> : children}
    </button>
  )
}
