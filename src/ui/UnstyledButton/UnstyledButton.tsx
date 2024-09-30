import {FC, PropsWithChildren, PropsWithRef} from 'react'
import {Box} from '../Box/Box'

export const UnstyledButton: FC<PropsWithChildren> = ({children}) => {
  return (
    <Box>
      <button>{children}</button>
    </Box>
  )
}
