import {HTMLAttributes, useState} from 'react'
interface UseHoverProps {
  disabled?: boolean
}

interface UseHoverResult {
  isHovered: boolean
  hoverProps: HTMLAttributes<HTMLElement>
}
export const useHover = ({disabled = false}: UseHoverProps): UseHoverResult => {
  const [hovered, setHovered] = useState<boolean>(false)
  const down = () => {
    if (disabled) return
    setHovered(true)
  }

  const up = () => {
    setHovered(false)
  }

  return {
    hoverProps: {onPointerEnter: down, onPointerLeave: up},
    isHovered: hovered,
  }
}
