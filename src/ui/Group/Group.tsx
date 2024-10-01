import {CSSProperties, FC} from 'react'
import {Box, BoxProps} from '../Box/Box'

import classes from './Group.module.css'
import {px} from '../../utils/px'
export interface GroupProps<T extends HTMLElement> extends BoxProps<T> {
  gap?: string | number
  wrap?: 'wrap' | 'nowrap'
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}

export interface GroupCSSProperties extends CSSProperties {
  '--group-gap'?: string
  '--group-wrap'?: string
  '--group-justify'?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
}

export const Group: FC<GroupProps<HTMLElement>> = (props) => {
  const groupStyle: GroupCSSProperties = {
    '--group-gap': px(props.gap),
    '--group-wrap': px(props.wrap),
    '--group-justify': props.justify,
  }

  return (
    <Box s={groupStyle} cn={classes.group} {...props}>
      {props.children}
    </Box>
  )
}
