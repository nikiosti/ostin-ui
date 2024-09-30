import {HTMLAttributes, KeyboardEvent, MouseEvent, useState} from 'react'
import {ButtonProps} from '../../ui/Button/types'

interface UsePressProps<T extends HTMLElement> {
  ref: React.RefObject<T>
  props?: HTMLAttributes<T> & ButtonProps
}

interface UsePressResult<T extends HTMLElement> {
  isPressed: boolean
  pressProps: HTMLAttributes<T>
}

export const usePress = <T extends HTMLElement>({ref, props}: UsePressProps<T>): UsePressResult<T> => {
  const [isPressed, setPressed] = useState<boolean>(false)
  const pressDown = () => {
    if (props?.disabled) return

    setPressed(true)
  }

  const pressUp = () => {
    if (props?.disabled) return
    ref?.current?.focus()

    setPressed(false)
  }

  const click = (e: MouseEvent<T>) => {
    if (props?.disabled) return
    props?.onClick?.(e)
  }

  const keyDown = (e: KeyboardEvent<T>) => {
    if (props?.disabled) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      pressDown()
    }
  }

  const keyUp = (e: KeyboardEvent<T>) => {
    if (props?.disabled) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      pressUp()
      click(e as unknown as React.MouseEvent<T>)
    }
  }

  return {
    isPressed,
    pressProps: {
      tabIndex: props?.tabIndex || 0,
      onClick: click,
      onKeyDown: keyDown,
      onKeyUp: keyUp,
      onMouseDown: pressDown,
      onMouseUp: pressUp,
      onMouseLeave: pressUp,
      onTouchStart: pressDown,
      onTouchEnd: pressUp,
      onTouchCancel: pressUp,
    },
  }
}
