import {FC, PropsWithChildren} from 'react'
import {useMove, useResizable} from '../../hooks'

import classes from './Resizable.module.css'

export const Resizable: FC<PropsWithChildren> = ({children}) => {
  const {ref, down} = useResizable({})
  const {ref: refMove, down: downMove} = useMove()

  return (
    <div
      className={`${classes.move} ${classes.resizable}`}
      onMouseDown={downMove}
      ref={(el) => {
        ref.current = el
        refMove.current = el
      }}
    >
      <div onMouseDown={(e) => down(e, 'left')} className={`${classes.resizer} ${classes.left}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>
      <div onMouseDown={(e) => down(e, 'top')} className={`${classes.resizer} ${classes.top}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>
      <div onMouseDown={(e) => down(e, 'right')} className={`${classes.resizer} ${classes.right}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>
      <div onMouseDown={(e) => down(e, 'bottom')} className={`${classes.resizer} ${classes.bottom}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>

      <div onMouseDown={(e) => down(e, 'bottom-left')} className={`${classes.resizer} ${classes.bottomLeft}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>
      <div onMouseDown={(e) => down(e, 'top-left')} className={`${classes.resizer} ${classes.topLeft}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>
      <div onMouseDown={(e) => down(e, 'bottom-right')} className={`${classes.resizer} ${classes.bottomRight}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>
      <div onMouseDown={(e) => down(e, 'top-right')} className={`${classes.resizer} ${classes.topRight}`}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="1.5" width="8" height="8" fill="white" stroke="#18A0FB" stroke-width="3" />
        </svg>
      </div>

      {children}
    </div>
  )
}
