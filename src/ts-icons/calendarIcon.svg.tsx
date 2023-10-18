import * as React from "react"
import { SVGProps } from "react"
const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="#737373"
            d="M4.75 2h4.5V.75C9.292.292 9.542.042 10 0c.458.042.708.292.75.75V2H12c.563.02 1.031.219 1.406.594S13.98 3.438 14 4v10c-.02.563-.219 1.031-.594 1.406S12.562 15.98 12 16H2c-.563-.02-1.031-.219-1.406-.594S.02 14.562 0 14V4c.02-.563.219-1.031.594-1.406S1.438 2.02 2 2h1.25V.75C3.292.292 3.542.042 4 0c.458.042.708.292.75.75V2ZM1.5 7.75H4V6H1.5v1.75Zm0 1.5v2H4v-2H1.5Zm4 0v2h3v-2h-3Zm4.5 0v2h2.5v-2H10ZM12.5 6H10v1.75h2.5V6Zm0 6.75H10v1.75h2c.313-.02.48-.188.5-.5v-1.25Zm-4 0h-3v1.75h3v-1.75Zm-4.5 0H1.5V14c.02.313.188.48.5.5h2v-1.75ZM8.5 6h-3v1.75h3V6Z"
        />
    </svg>
)
export default CalendarIcon;