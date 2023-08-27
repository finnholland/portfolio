import * as React from "react"
import { SVGProps } from "react"
const Link = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill={props.fill}
      d="M5.429 4.143a2.286 2.286 0 0 0-2.286 2.286v9.142a2.286 2.286 0 0 0 2.286 2.286h9.142a2.286 2.286 0 0 0 2.286-2.286v-2.857a.571.571 0 1 1 1.143 0v2.857A3.429 3.429 0 0 1 14.571 19H5.43A3.428 3.428 0 0 1 2 15.571V6.43A3.429 3.429 0 0 1 5.429 3h2.857a.571.571 0 1 1 0 1.143H5.429Zm5.714-.572A.572.572 0 0 1 11.714 3h5.715a.571.571 0 0 1 .571.571v5.715a.571.571 0 1 1-1.143 0V4.95L12.12 9.69a.572.572 0 0 1-.81-.81l4.74-4.738h-4.335a.572.572 0 0 1-.571-.572Z"
    />
  </svg>
)
export default Link

