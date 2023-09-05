import * as React from "react"
import { SVGProps } from "react"
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <path
            fill={props.fill || "#9CA3AF"}
            fillRule="evenodd"
            d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z"
            clipRule="evenodd"
        />
    </svg>
)
export default SearchIcon;
