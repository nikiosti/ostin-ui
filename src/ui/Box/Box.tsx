import {CSSProperties, FC, HTMLAttributes} from 'react'

import classes from './Box.module.css'
import {px} from '../../utils/px'
export interface BoxProps<T extends HTMLElement> extends HTMLAttributes<T> {
  m?: string | number

  mx?: string | number
  my?: string | number

  mt?: string | number
  mb?: string | number
  mr?: string | number
  ml?: string | number

  cn?: string

  s?: CSSProperties
}

export const Box: FC<BoxProps<HTMLElement>> = (props) => {
  const boxStyle = {
    '--box-margin': px(props.m),
    '--box-margin-top': px(props.mt) || px(props.my) || px(props.m),
    '--box-margin-bottom': px(props.mb) || px(props.my) || px(props.m),
    '--box-margin-right': px(props.mr) || px(props.mx) || px(props.m),
    '--box-margin-left': px(props.ml) || px(props.mx) || px(props.m),
    ...props.s,
    ...props.style,
  }

  return (
    <div style={boxStyle} className={`${classes.box} ${props.cn}`} {...props}>
      {props.children}
    </div>
  )
}
