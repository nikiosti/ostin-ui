import { useRef } from "react"

export const useMove = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  const down = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement
    if (target.className.indexOf('dot') > -1) return

    const offsetLeft = ref.current?.offsetLeft!
    const offsetTop = ref.current?.offsetTop!
    const pressX = e.clientX
    const pressY = e.clientY

    const move = (e: MouseEvent) => {
      if (!ref.current) return
      const style = ref.current.style
      style.left = offsetLeft + (e.clientX - pressX) + 'px'
      style.top = offsetTop + (e.clientY - pressY) + 'px'
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }
  return {ref, down}
}