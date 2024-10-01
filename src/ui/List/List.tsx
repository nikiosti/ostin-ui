import {Box} from '../Box/Box'
import {CSSProperties, FC} from 'react'
import {BoxProps} from '../Box/Box'

import classes from './List.module.css'
export interface ListProps extends BoxProps<HTMLDivElement> {
  listType?: 'ordered' | 'unordered'
}

export interface ListItemProps extends BoxProps<HTMLDivElement> {}

export interface GroupCSSProperties extends CSSProperties {
  '--list-type': 'ordered' | 'unordered'
}

const List: FC<ListProps> = ({children, listType = 'unordered', ...props}) => {
  const listStyle: GroupCSSProperties = {
    '--list-type': listType,
  }

  const ListElement = listType === 'ordered' ? 'ol' : 'ul'

  return (
    <Box s={listStyle} cn={classes.root} {...props}>
      <ListElement>{children}</ListElement>
    </Box>
  )
}

const ListItem: FC<ListItemProps> = (props) => {
  const {children} = props
  return (
    <Box {...props}>
      <li>{children}</li>
    </Box>
  )
}

interface ListComponent extends FC<ListProps> {
  Item: FC<ListItemProps>
}

const ListComponent: ListComponent = Object.assign(List, {Item: ListItem})

export {ListComponent as List}
