import React, {useRef} from 'react'

interface UseMoveOptions {
  constrainToBounds?: boolean
  disabled?: boolean
}

export const useMove = ({constrainToBounds = false, disabled = false}: UseMoveOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const delta = useRef({dx: 0, dy: 0})
  const down = (e: React.MouseEvent) => {
    if (disabled) return

    delta.current.dx = ref.current?.getBoundingClientRect().left || 0
    delta.current.dy = ref.current?.getBoundingClientRect().top || 0

    const startPos = {
      x: e.clientX - delta.current.dx,
      y: e.clientY - delta.current.dy,
    }

    const handleMouseMove = (e: MouseEvent) => {
      const parentBounds = ref.current?.parentElement?.getBoundingClientRect()
      const elementBounds = ref.current?.getBoundingClientRect()

      let dx = e.pageX - startPos.x
      let dy = e.pageY - startPos.y

      if (constrainToBounds && parentBounds && elementBounds) {
        dx = Math.min(parentBounds.width - elementBounds.width, Math.max(dx, 0))
        dy = Math.min(parentBounds.height - elementBounds.height, Math.max(dy, 0))
      }

      delta.current = {dx, dy}

      if (ref.current) {
        ref.current.style.left = `${delta.current.dx}px`
        ref.current.style.top = `${delta.current.dy}px`
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return {ref, down} as const
}
