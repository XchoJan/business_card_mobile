import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={10}
      height={13}
      viewBox="0 0 10 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_153_27708)" fill="#777">
        <Path d="M8.089 8.568v-.97.97zM8.089 5.554V4.493c-.007-1.234-.46-2.36-1.185-3.168C6.174.508 5.158-.001 4.044 0c-1.114 0-2.13.508-2.86 1.325C.455 2.14 0 3.277 0 4.523h1.813c0-.692.248-1.31.653-1.765.407-.453.96-.73 1.578-.73.62 0 1.172.277 1.578.73.399.447.645 1.051.654 1.73V13h1.813V5.554z" />
        <Path d="M6.276 5.554H4.365v2.044h1.91M10 5.554H8.089v2.044h1.91M10 8.568H8.089v2.044h1.91M6.276 8.568H4.365v2.044h1.91" />
      </G>
      <Defs>
        <ClipPath id="clip0_153_27708">
          <Path fill="#fff" d="M0 0H10V13H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
