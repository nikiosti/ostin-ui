import {FC, PropsWithChildren} from 'react'
import {useMove, useResizable} from '../../hooks'

import classes from './TextResizable.module.css'

export const TextResizable: FC<PropsWithChildren> = ({children}) => {
  const {ref, down} = useResizable({
    customUpdateSize: ({width, startX, startY}) => {
      if (!ref.current) return
      ref.current.style.width = `${width}px`
      ref.current.style.left = `${startX}px`
      ref.current.style.top = `${startY}px`
    },
  })
  const {ref: refMove, down: downMove} = useMove()

  return (
    <div
      onMouseDown={downMove}
      className={classes.resizable}
      ref={(el) => {
        ref.current = el
        refMove.current = el
      }}
    >
      {children}
      <div onMouseDown={(e) => down(e, 'left')} className={`${classes.resizer} ${classes.left}`}></div>
      <div onMouseDown={(e) => down(e, 'right')} className={`${classes.resizer} ${classes.right}`}></div>
    </div>
  )
}
