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
        d="M9 6a3 3 0 116 0 3 3 0 01-6 0zm3-5a5 5 0 100 10 5 5 0 000-10zM9 13a5 5 0 00-5 5v3a1 1 0 102 0v-3a3 3 0 013-3h6a3 3 0 013 3v3a1 1 0 102 0v-3a5 5 0 00-5-5H9z"
        fill="#367FA9"
      />
      <Path
        d="M9 6a3 3 0 116 0 3 3 0 01-6 0zm3-5a5 5 0 100 10 5 5 0 000-10zM9 13a5 5 0 00-5 5v3a1 1 0 102 0v-3a3 3 0 013-3h6a3 3 0 013 3v3a1 1 0 102 0v-3a5 5 0 00-5-5H9z"
        fill="#000"
        fillOpacity={0.2}
      />
    </Svg>
  )
}

export default SvgComponent
