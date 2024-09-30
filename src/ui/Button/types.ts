import {ReactNode} from 'react'
export interface ButtonCssVariables extends React.CSSProperties {
  '--button-height'?: string
  '--button-padding-x'?: string
  '--button-bg'?: string
  '--button-bg-hover'?: string
  '--button-color'?: string
  '--button-border'?: string
  '--button-radius'?: string
}
export interface ButtonProps {
  disabled?: boolean
  children: ReactNode
  style?: ButtonCssVariables
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'default'
}
