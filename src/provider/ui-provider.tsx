import React, {FC, PropsWithChildren} from 'react'
import {colors} from './theme'

interface CSSPropertiesWithCustomVariables extends React.CSSProperties {}

export const UIProvider: FC<PropsWithChildren> = ({children}) => {
  const generateColor = (colors: {[key: string]: string | string[]}) => {
    const colorVariables: {[key: string]: string} = {}

    Object.keys(colors).forEach((colorKey) => {
      if (Array.isArray(colors[colorKey])) {
        colors[colorKey].forEach((colorValue, colorIndex) => {
          colorVariables[`--ui-color-${colorKey}-${colorIndex}`] = colorValue
        })
      } else {
        colorVariables[`--ui-${colorKey}`] = colors[colorKey]
      }
    })

    return colorVariables
  }

  const colorVariables = generateColor(colors)
  const styles: CSSPropertiesWithCustomVariables = {
    ...colorVariables,
  }

  return <div style={styles}>{children}</div>
}
