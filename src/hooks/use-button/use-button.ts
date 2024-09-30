import {HTMLAttributes} from 'react'
import {ButtonProps} from '../../ui/Button/types'
import {usePress} from '../use-press/use-press'
import {useHover} from '../use-hover/use-hover'

interface UseButtonProps<T extends HTMLElement> {
  ref: React.RefObject<T>
  props?: HTMLAttributes<T> & ButtonProps
}
export const useButton = <T extends HTMLElement>({ref, props}: UseButtonProps<T>) => {
  const {isPressed, pressProps} = usePress({ref, props})
  const {isHovered, hoverProps} = useHover({disabled: props?.disabled})
  const buttonProps = {
    'data-pressed': isPressed,
    'data-hovered': isHovered,
    'data-disabled': props?.disabled,
    disabled: props?.disabled,
    ...pressProps,
    ...hoverProps,
  }
  return {buttonProps}
}
