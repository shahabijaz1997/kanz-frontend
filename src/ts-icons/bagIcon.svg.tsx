import * as React from "react"
import { SVGProps } from "react"
const BagIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke={props?.stroke || "#000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.29-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.182 2.182 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.117 48.117 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.98 23.98 0 0 1 12 15.75a24 24 0 0 1-7.577-1.22 2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.11 48.11 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.668 48.668 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
        />
    </svg>
)
export default BagIcon;