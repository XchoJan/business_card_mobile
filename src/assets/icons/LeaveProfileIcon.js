import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={20}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M2 3a1 1 0 011-1h11.5a1 1 0 011 1v2.444a1 1 0 102 0V3a3 3 0 00-3-3H3a3 3 0 00-3 3v13.778a3 3 0 003 3h11.5a3 3 0 003-3v-2.445a1 1 0 10-2 0v2.445a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm18.207 3.182a1 1 0 10-1.414 1.414l1.293 1.293H8a1 1 0 100 2h12.086l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3z"
        fill="#FF3636"
      />
    </Svg>
  )
}

export default SvgComponent
