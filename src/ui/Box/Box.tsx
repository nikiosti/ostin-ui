import {FC, PropsWithChildren} from 'react'

export const Box: FC<PropsWithChildren> = ({children}) => {
  return <div>{children}</div>
}
