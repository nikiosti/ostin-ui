import {FC, HTMLAttributes, isValidElement, useRef} from 'react'
import {useButton} from '../../hooks'
import {ButtonCssVariables, ButtonProps} from './types'

import classes from './Button.module.css'
import {px} from '../../utils/px'
import {Box} from '../Box/Box'

const getVariantStyles = (variant: ButtonProps['variant']): ButtonCssVariables => {
  switch (variant) {
    case 'filled':
      return {
        '--button-bg': 'var(--ui-primary-color-filled)',
        '--button-bg-hover': 'var(--ui-primary-color-filled-hover)',
        '--button-color': 'var(--ui-color-white)',
      }
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

export const Button: FC<HTMLAttributes<HTMLButtonElement> & ButtonProps> = ({leftSection, ...props}) => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const {children, variant, style, className, rightSection, color, bg, radius} = props

  const variantStyles = getVariantStyles(variant)
  const buttonStyles: ButtonCssVariables = {
    '--button-color': color,
    '--button-bg': bg,
    '--button-radius': px(radius),
    ...variantStyles,
    ...style,
  }

  const {buttonProps} = useButton({ref, props})

  return (
    <Box cn={className} s={style} {...props}>
      <button ref={ref} className={classes.root} style={buttonStyles} {...buttonProps}>
        {leftSection && <div className={classes.left}>{leftSection}</div>}
        {isValidElement(children) ? children : <span className={classes.label}>{children}</span>}
        {rightSection && <div>{rightSection}</div>}
      </button>
    </Box>
  )
}
