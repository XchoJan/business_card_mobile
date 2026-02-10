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
      <Path d="M5 15a1 1 0 100 2h3a1 1 0 100-2H5z" fill="#367FA9" />
      <Path
        d="M5 15a1 1 0 100 2h3a1 1 0 100-2H5z"
        fill="#000"
        fillOpacity={0.2}
      />
      <Path
        d="M0 6a3 3 0 013-3h18a3 3 0 013 3v12a3 3 0 01-3 3H3a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v1h20V6a1 1 0 00-1-1H3zM2 18a1 1 0 001 1h18a1 1 0 001-1V9H2v9z"
        fill="#367FA9"
      />
      <Path
        d="M0 6a3 3 0 013-3h18a3 3 0 013 3v12a3 3 0 01-3 3H3a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v1h20V6a1 1 0 00-1-1H3zM2 18a1 1 0 001 1h18a1 1 0 001-1V9H2v9z"
        fill="#000"
        fillOpacity={0.2}
      />
    </Svg>
  )
}

export default SvgComponent
