import {ReactNode} from 'react'
import {BoxProps} from '../Box/Box'
export interface ButtonCssVariables extends React.CSSProperties {
  '--button-padding-x'?: string
  '--button-bg'?: string
  '--button-bg-hover'?: string
  '--button-color'?: string
  '--button-border'?: string
  '--button-radius'?: string | number
}
export interface ButtonProps extends BoxProps<HTMLButtonElement> {
  disabled?: boolean
  children: ReactNode
  style?: ButtonCssVariables
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'default'
  leftSection?: ReactNode
  rightSection?: ReactNode
  color?: string
  bg?: string
  radius?: string | number
}
