import {useMove, useResizable, useRotate} from '../../hooks'
import {Image} from '../Image/Image'

import './ResizableImage.css'
const ResizableImage = () => {
  const {ref: refMove, down: downMove} = useMove()
  const {ref: refRotate, refWrapper: refWrapperRotate, down: downRotate} = useRotate()
  const {ref: refResize, refWrapper: refWrapperResize, down: downResize} = useResizable()
  console.log('-----------------')
  return (
    <div
      className="box"
      ref={(el) => {
        refResize.current = el
        refMove.current = el
        refRotate.current = el
      }}
      onMouseDown={downMove}
    >
      <div
        className="box-wrapper"
        ref={(el) => {
          refWrapperResize.current = el
          refWrapperRotate.current = el
        }}
      >
        <Image url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s" />
        <div className="dot rotate" onMouseDown={downRotate}></div>
        <div className="dot left-top" onMouseDown={(e) => downResize(e, 'top-left')}></div>
        <div className="dot left-bottom" onMouseDown={(e) => downResize(e, 'bottom-left')}></div>
        <div className="dot top-mid" onMouseDown={(e) => downResize(e, 'top')}></div>
        <div className="dot bottom-mid" onMouseDown={(e) => downResize(e, 'bottom')}></div>
        <div className="dot left-mid" onMouseDown={(e) => downResize(e, 'left')}></div>
        <div className="dot right-mid" onMouseDown={(e) => downResize(e, 'right')}></div>
        <div className="dot right-bottom" onMouseDown={(e) => downResize(e, 'bottom-right')}></div>
        <div className="dot right-top" onMouseDown={(e) => downResize(e, 'top-right')}></div>
        <div className="rotate-link"></div>
      </div>
    </div>
  )
}

export default ResizableImage
