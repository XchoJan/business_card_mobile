import * as React from "react"
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Rect width={32} height={32} rx={8} fill="url(#pattern0_153_20630)" />
      <Defs>
        <Pattern
          id="pattern0_153_20630"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_153_20630" transform="scale(.00833)" />
        </Pattern>
        <Image
          id="image0_153_20630"
          width={120}
          height={120}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  )
}

export default SvgComponent
