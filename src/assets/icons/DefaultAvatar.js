import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={30} cy={30} r={30} fill="#DBDBDB" />
      <Path
        d="M30 16.5c-3.624 0-6.563 2.878-6.563 6.429 0 3.55 2.939 6.428 6.563 6.428 3.624 0 6.563-2.878 6.563-6.428S33.623 16.5 30 16.5zm-3.938 15.429c-3.624 0-6.562 2.878-6.562 6.428v3.857c0 .71.588 1.286 1.313 1.286.724 0 1.312-.576 1.312-1.286v-3.857c0-2.13-3.487 5.143-1.313 5.143h18.375c2.175 0-1.312-7.273-1.312-5.143v3.857c0 .71.588 1.286 1.313 1.286.724 0 1.312-.576 1.312-1.286v-3.857c0-3.55-2.938-6.428-6.563-6.428h-7.874z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
