import {useRef} from 'react'

type ResizeDirection = 'right' | 'bottom' | 'left' | 'top' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export const useResizable = () => {
  const minWidth = 0
  const minHeight = 0
  const getCurrentRotation = (el: HTMLDivElement) => {
    const computedStyle = window.getComputedStyle(el, null)
    const transformValue = getTransformValue(computedStyle)

    if (transformValue !== 'none') {
      const [x, y] = getTransformValues(transformValue)
      const angle = calculateRotationAngle(x, y)
      return normalizeAngle(angle)
    }

    return 0
  }

  const getTransformValue = (computedStyle: CSSStyleDeclaration) => {
    return (
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('-moz-transform') ||
      computedStyle.getPropertyValue('-ms-transform') ||
      computedStyle.getPropertyValue('-o-transform') ||
      computedStyle.getPropertyValue('transform')
    )
  }

  const getTransformValues = (transformValue: string) => {
    const values = transformValue.split('(')[1].split(')')[0].split(',')
    return [parseFloat(values[0]), parseFloat(values[1])]
  }

  const calculateRotationAngle = (x: number, y: number) => {
    return Math.round(Math.atan2(y, x) * (180 / Math.PI))
  }

  const normalizeAngle = (angle: number) => {
    return angle < 0 ? angle + 360 : angle
  }

  const ref = useRef<HTMLDivElement | null>(null)
  const refWrapper = useRef<HTMLDivElement | null>(null)
  const down = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.stopPropagation()
    const offsetLeft = ref.current?.offsetLeft!
    const offsetTop = ref.current?.offsetTop!
    const offsetWidth = refWrapper.current?.offsetWidth!
    const offsetHeight = refWrapper.current?.offsetHeight!
    const pressX = e.clientX
    const pressY = e.clientY

    const initRotate = getCurrentRotation(ref.current!)
    const initRadians = (initRotate * Math.PI) / 180
    const cosFraction = Math.cos(initRadians)
    const sinFraction = Math.sin(initRadians)
    const move = (e: MouseEvent) => {
      const diffX = e.clientX - pressX
      const diffY = e.clientY - pressY

      let diffXRotated = cosFraction * diffX + sinFraction * diffY
      let diffYRotated = cosFraction * diffY - sinFraction * diffX
      let newW = offsetWidth,
        newH = offsetHeight,
        newX = offsetLeft,
        newY = offsetTop
      switch (direction) {
        case 'right':
          newW = offsetWidth + diffXRotated
          if (newW < minWidth) {
            newW = minWidth
            diffXRotated = minWidth - offsetWidth
          }
          newX += 0.5 * diffXRotated * cosFraction
          newY += 0.5 * diffXRotated * sinFraction
          break
        case 'bottom':
          newH = offsetHeight + diffYRotated
          if (newH < minHeight) {
            newH = minHeight
            diffYRotated = minHeight - offsetHeight
          }
          newX -= 0.5 * diffYRotated * sinFraction
          newY += 0.5 * diffYRotated * cosFraction
          break
        case 'left':
          newW = offsetWidth - diffXRotated
          if (newW < minWidth) {
            newW = minWidth
            diffXRotated = offsetWidth - minWidth
          }
          newX += 0.5 * diffXRotated * cosFraction
          newY += 0.5 * diffXRotated * sinFraction
          break
        case 'top':
          newH = offsetHeight - diffYRotated
          if (newH < minHeight) {
            newH = minHeight
            diffYRotated = offsetHeight - minHeight
          }
          newX -= 0.5 * diffYRotated * sinFraction
          newY += 0.5 * diffYRotated * cosFraction
          break
        case 'top-left':
          newW = offsetWidth - diffXRotated
          if (newW < minWidth) {
            newW = minWidth
            diffXRotated = offsetWidth - minWidth
          }
          newX += 0.5 * diffXRotated * cosFraction
          newY += 0.5 * diffXRotated * sinFraction

          newH = offsetHeight - diffYRotated
          if (newH < minHeight) {
            newH = minHeight
            diffYRotated = offsetHeight - minHeight
          }
          newX -= 0.5 * diffYRotated * sinFraction
          newY += 0.5 * diffYRotated * cosFraction

          break
        case 'top-right':
          newW = offsetWidth + diffXRotated
          if (newW < minWidth) {
            newW = minWidth
            diffXRotated = minWidth - offsetWidth
          }
          newX += 0.5 * diffXRotated * cosFraction
          newY += 0.5 * diffXRotated * sinFraction

          newH = offsetHeight - diffYRotated
          if (newH < minHeight) {
            newH = minHeight
            diffYRotated = offsetHeight - minHeight
          }
          newX -= 0.5 * diffYRotated * sinFraction
          newY += 0.5 * diffYRotated * cosFraction
          break
        case 'bottom-left':
          newW = offsetWidth - diffXRotated
          if (newW < minWidth) {
            newW = minWidth
            diffXRotated = offsetWidth - minWidth
          }
          newX += 0.5 * diffXRotated * cosFraction
          newY += 0.5 * diffXRotated * sinFraction

          newH = offsetHeight + diffYRotated
          if (newH < minHeight) {
            newH = minHeight
            diffYRotated = minHeight - offsetHeight
          }

          newX -= 0.5 * diffYRotated * sinFraction
          newY += 0.5 * diffYRotated * cosFraction

          break
        case 'bottom-right':
          newW = offsetWidth + diffXRotated
          if (newW < minWidth) {
            newW = minWidth

            diffXRotated = minWidth - offsetWidth
          }
          newX += 0.5 * diffXRotated * cosFraction
          newY += 0.5 * diffXRotated * sinFraction
          newH = offsetHeight + diffYRotated
          if (newH < minHeight) {
            newH = minHeight
            diffYRotated = minHeight - offsetHeight
          }
          newX -= 0.5 * diffYRotated * sinFraction
          newY += 0.5 * diffYRotated * cosFraction
          break

        default:
          break
      }

      if (!ref.current || !refWrapper.current) return
      const style = ref.current.style
      const wrapperStyle = refWrapper.current.style

      style.left = newX + 'px'
      style.top = newY + 'px'
      wrapperStyle.width = newW + 'px'
      wrapperStyle.height = newH + 'px'
    }
    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
  return {ref, refWrapper, down}
}
