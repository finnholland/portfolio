import * as React from "react"
import { SVGProps } from "react"
const LinkedIn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill={props.fill}
        d="M18.5 0h-17A1.5 1.5 0 0 0 0 1.5v17A1.5 1.5 0 0 0 1.5 20h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 18.5 0ZM6 17H3V8h3v9ZM4.5 6.25A1.75 1.75 0 1 1 6.3 4.5a1.78 1.78 0 0 1-1.8 1.75ZM17 17h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 11 12.19a.655.655 0 0 0 0 .14V17H8V8h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66L17 17Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill={props.fill} d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default LinkedIn
