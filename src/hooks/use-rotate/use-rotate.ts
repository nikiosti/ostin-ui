import React, {useRef} from 'react'

export const useRotate = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const refWrapper = useRef<HTMLDivElement | null>(null)
  const down = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!refWrapper.current) return
    const arrowRects = refWrapper.current.getBoundingClientRect()
    const arrowX = arrowRects.left + arrowRects.width / 2
    const arrowY = arrowRects.top + arrowRects.height / 2

    const move = (e: MouseEvent) => {
      if (!ref.current) return
      const angle = Math.atan2(e.clientY - arrowY, e.clientX - arrowX) + Math.PI / 2
      const style = ref.current.style
      style.transform = `rotate(${(angle * 180) / Math.PI}deg)`
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
