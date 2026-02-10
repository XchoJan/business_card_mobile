import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 3a3 3 0 00-3 3v12a3 3 0 003 3h18a3 3 0 003-3V6a3 3 0 00-3-3H3zM2 6.535l8.336 5.557a3 3 0 003.328 0L22 6.535V18a1 1 0 01-1 1H3a1 1 0 01-1-1V6.535zM20.697 5l-8.142 5.428a1 1 0 01-1.11 0L3.303 5h17.394z"
        fill={props.fill}
      />
    </Svg>
  )
}

export default SvgComponent
