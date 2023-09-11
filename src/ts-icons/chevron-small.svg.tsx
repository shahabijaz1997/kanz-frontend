import * as React from "react"
import { SVGProps } from "react"
const ChevronSmall = (props: SVGProps<SVGSVGElement>) => (
    <svg fill={props.fill} aria-hidden="true" viewBox="0 0 20 20" {...props}>
        <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" />
    </svg>
)
export default ChevronSmall;
