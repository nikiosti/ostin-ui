import {FC} from 'react'
import classes from './Image.module.css'

interface ImageParams {
  url: string
}

export const Image: FC<ImageParams> = ({url}) => {
  return <img src={url} alt="image" className={classes.image} onMouseDown={(e) => e.preventDefault()} />
}
