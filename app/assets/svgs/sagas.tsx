import * as React from "react"
import { SVGProps } from "react"
const Sagas = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 90"
    fill="none"
    {...props}
  >
    <rect width={90} height={90} fill={props["aria-atomic"] ? "#fff" : "#ffffff00"} rx={20} />
    <path
      fill={props["aria-atomic"] ? "#7DD3FC" : "#FFF"}
      fillRule="evenodd"
      d="M20 0C8.954 0 0 8.954 0 20v50c0 11.046 8.954 20 20 20h50c11.046 0 20-8.954 20-20V20C90 8.954 81.046 0 70 0H20Zm1.565 31.794c0-.247.2-.446.446-.446h14.674c.246 0 .445.2.445.446v14.673c0 .247-.2.446-.445.446H22.01a.446.446 0 0 1-.446-.446V31.794Zm.446-4.446a4.446 4.446 0 0 0-4.446 4.446v14.673a4.446 4.446 0 0 0 4.446 4.446h14.674a4.446 4.446 0 0 0 4.445-4.446V31.794a4.446 4.446 0 0 0-4.445-4.446H22.01Zm-6.446-7.783a4 4 0 0 1 4-4h50.87a4 4 0 0 1 0 8h-50.87a4 4 0 0 1-4-4Zm31.391 23.522h25.435v-4H46.956v4Zm0 7.826h25.435v-4H46.956v4Zm0 7.826h25.435v-4H46.956v4Zm25.435 3.826H25.435v4H72.39v-4ZM25.435 74.391H72.39v-4H25.435v4Zm-3.913-9.826a1.956 1.956 0 1 1-3.913 0 1.956 1.956 0 0 1 3.913 0Zm-1.957 9.783a1.956 1.956 0 1 0 0-3.913 1.956 1.956 0 0 0 0 3.913Z"
      clipRule="evenodd"
    />
  </svg>
)
export default Sagas
