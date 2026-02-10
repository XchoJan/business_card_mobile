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
        d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 6a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zm1 9a1 1 0 11-2 0 1 1 0 012 0z"
        fill="#367FA9"
      />
      <Path
        d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 6a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zm1 9a1 1 0 11-2 0 1 1 0 012 0z"
        fill="#000"
        fillOpacity={0.2}
      />
    </Svg>
  )
}

export default SvgComponent
