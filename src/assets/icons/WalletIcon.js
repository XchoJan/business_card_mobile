import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

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
      <G clipPath="url(#clip0_250_1004)" fill={props.fill}>
        <Path d="M5 15a1 1 0 100 2h3a1 1 0 100-2H5z" />
        <Path d="M0 6a3 3 0 013-3h18a3 3 0 013 3v12a3 3 0 01-3 3H3a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v1h20V6a1 1 0 00-1-1H3zM2 18a1 1 0 001 1h18a1 1 0 001-1V9H2v9z" />
      </G>
      <Defs>
        <ClipPath id="clip0_250_1004">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
