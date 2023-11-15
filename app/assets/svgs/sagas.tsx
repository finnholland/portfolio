import * as React from "react"
import { SVGProps } from "react"
const Sagas = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 92 92"
    fill="none"
    {...props}
  >
    <rect width={92} height={92} fill={props["aria-atomic"] ? "#7DD3FC" : "#FFF"} rx={20} />
    <g clipPath="url(#a)">
      <path
        stroke={props["aria-atomic"] ? "#FFF" : "#1B2339"}
        strokeWidth={4}
        d="M20 47.5v-15a2.5 2.5 0 0 1 2.5-2.5h15a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5h-15a2.5 2.5 0 0 1-2.5-2.5Z"
      />
      <path stroke={props["aria-atomic"] ? "#FFF" : "#1B2339"} strokeLinecap="round" strokeWidth={8} d="M20 20h52" />
      <path
        stroke={props["aria-atomic"] ? "#FFF" : "#1B2339"}
        strokeWidth={4}
        d="M48 50h26m0 16H26m0 8h48M48 42h26M48 58h26"
      />
      <circle cx={20} cy={66} r={2} fill="#fff" />
      <circle cx={20} cy={74} r={2} fill="#fff" />
    </g>
  </svg>
)
export default Sagas
