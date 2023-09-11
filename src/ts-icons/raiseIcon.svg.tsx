import * as React from "react"
import { SVGProps } from "react"
const RaiseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={8}
        height={10}
        fill="none"
        {...props}
    >
        <path
            fill="#22C55E"
            fillRule="evenodd"
            d="M.47 4.78a.75.75 0 0 1 0-1.06l3.004-3a.751.751 0 0 1 1.061 0l3.004 3a.75.75 0 0 1-1.062 1.06L4.755 3.06v5.69a.75.75 0 0 1-1.281.53.75.75 0 0 1-.22-.53V3.06L1.532 4.78a.751.751 0 0 1-1.062 0Z"
            clipRule="evenodd"
        />
    </svg>
)
export default RaiseIcon;
