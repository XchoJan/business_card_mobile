import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={22}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_153_20338)" fill={props.fill}>
        <Path d="M14.56 14.5v-1.643V14.5zM14.56 9.399V7.603c-.013-2.088-.829-3.993-2.133-5.361C11.115.859 9.285-.001 7.28 0 5.275-.001 3.444.86 2.132 2.242.817 3.622 0 5.546 0 7.654h3.263c0-1.172.447-2.217 1.176-2.986C5.171 3.9 6.165 3.43 7.28 3.43c1.115.001 2.109.47 2.841 1.238a4.311 4.311 0 011.176 2.926V22h3.264V9.399z" />
        <Path d="M11.297 9.398h-3.44v3.46h3.44M18 9.398h-3.44v3.46H18M18 14.5h-3.44v3.459H18M11.297 14.5h-3.44v3.459h3.44" />
      </G>
      <Defs>
        <ClipPath id="clip0_153_20338">
          <Path fill="#fff" d="M0 0H18V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
