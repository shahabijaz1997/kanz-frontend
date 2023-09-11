import * as React from "react"
import { SVGProps } from "react"
const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={4}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="#A3A3A3"
            d="M2 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM2 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM2 16a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
        />
    </svg>
)
export default MenuIcon;