import {useRef} from 'react'
import {CustomUpdateSize, CustomUpdateSizeParams} from '../../ui/TextResizable'

type ResizeDirection = 'right' | 'bottom' | 'left' | 'top' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface Size {
  width: number
  height: number
  startX: number
  startY: number
}

interface UseResizableParams {
  customUpdateSize?: CustomUpdateSize
  onUp?: () => void
  onMove?: () => void
  onDown?: () => void
}

interface UseResizableResult {
  ref: React.MutableRefObject<HTMLDivElement | null>
  down: (e: React.MouseEvent, direction: ResizeDirection) => void
}

export const useResizable = ({customUpdateSize, onUp, onMove, onDown}: UseResizableParams): UseResizableResult => {
  const ref = useRef<HTMLDivElement | null>(null)
  const size = useRef<Size>({
    width: 100,
    height: 100,
    startX: 100,
    startY: 100,
  })

  const defaultUpdateSize = ({width, height, startX, startY}: CustomUpdateSizeParams) => {
    size.current = {width, height, startX, startY}
    if (ref.current) {
      ref.current.style.width = `${width}px`
      ref.current.style.height = `${height}px`
      ref.current.style.left = `${startX}px`
      ref.current.style.top = `${startY}px`
    }
  }

  const updateSize = customUpdateSize || defaultUpdateSize

  const handleResize = (e: MouseEvent, direction: ResizeDirection) => {
    if (!ref.current) return
    const startX = e.pageX
    const startY = e.pageY

    const initialWidth = ref.current.offsetWidth
    const initialHeight = ref.current.offsetHeight
    const initialLeft = ref.current.offsetLeft
    const initialTop = ref.current.offsetTop

    const move = (moveEvent: MouseEvent) => {
      onMove && onMove()

      const deltaX = moveEvent.pageX - startX
      const deltaY = moveEvent.pageY - startY

      let newWidth = initialWidth
      let newHeight = initialHeight
      let newLeft = initialLeft
      let newTop = initialTop

      switch (direction) {
        case 'right':
          newWidth = initialWidth + deltaX
          if (newWidth < 0) newWidth = 0
          break
        case 'bottom':
          newHeight = initialHeight + deltaY
          if (newHeight < 0) newHeight = 0
          break
        case 'left':
          newWidth = initialWidth - deltaX
          newLeft = initialLeft + deltaX
          if (newWidth < 0) {
            newWidth = 0
            newLeft = initialLeft + initialWidth
          }
          break

        case 'top':
          newHeight = initialHeight - deltaY
          newTop = initialTop + deltaY
          if (newHeight < 0) {
            newHeight = 0
            newTop = initialTop + initialHeight
          }
          break
        case 'top-left':
          newWidth = initialWidth - deltaX
          newHeight = initialHeight - deltaY
          newLeft = initialLeft + deltaX
          newTop = initialTop + deltaY
          if (newWidth < 0) {
            newWidth = 0
            newLeft = initialLeft + initialWidth
          }
          if (newHeight < 0) {
            newHeight = 0
            newTop = initialTop + initialHeight
          }
          break
        case 'top-right':
          newWidth = initialWidth + deltaX
          newHeight = initialHeight - deltaY
          newTop = initialTop + deltaY
          if (newWidth < 0) newWidth = 0
          if (newHeight < 0) {
            newHeight = 0
            newTop = initialTop + initialHeight
          }
          break
        case 'bottom-left':
          newHeight = initialHeight + deltaY
          newWidth = initialWidth - deltaX
          newLeft = initialLeft + deltaX
          if (newWidth < 0) {
            newWidth = 0
            newLeft = initialLeft + initialWidth
          }
          if (newHeight < 0) newHeight = 0
          break
        case 'bottom-right':
          newWidth = initialWidth + deltaX
          newHeight = initialHeight + deltaY
          if (newWidth < 0) newWidth = 0
          if (newHeight < 0) newHeight = 0
          break
        default:
          break
      }

      updateSize({width: newWidth, height: newHeight, startX: newLeft, startY: newTop})
    }

    const up = () => {
      onUp && onUp()
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const down = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault()
    e.stopPropagation()
    onDown && onDown()
    handleResize(e.nativeEvent, direction)
  }

  return {ref, down} as const
}
