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
        d="M1 2a1 1 0 011-1h20a1 1 0 110 2h-2v15a1 1 0 01-.293.707l-4 4A1 1 0 0115 23H5a1 1 0 01-1-1V3H2a1 1 0 01-1-1zm5 1v18h8.586L18 17.586V3H6zm2 6a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h3a1 1 0 110 2H9a1 1 0 01-1-1z"
        fill={props.fill}
      />
    </Svg>
  )
}

export default SvgComponent
