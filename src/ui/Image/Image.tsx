import React, {FC} from 'react'
import classes from './Image.module.css'

interface ImageParams {
  url: string
  style?: React.CSSProperties
}

export const Image: FC<ImageParams> = ({url, style}) => {
  return (
    <img src={url} alt="image" className={classes.image} onMouseDown={(e) => e.preventDefault()} style={{...style}} />
  )
}
