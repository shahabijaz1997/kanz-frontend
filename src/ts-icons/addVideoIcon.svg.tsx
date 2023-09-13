import { SVGProps } from "react"
const AddVideo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={30}
    fill="none"
    {...props}
  >
    <path
      stroke={props.stroke || "#A3A3A3"}
      strokeLinecap="round"
      strokeWidth={2}
      d="m28.5 12 9.44-9.44a1.5 1.5 0 0 1 2.56 1.06v22.76a1.5 1.5 0 0 1-2.56 1.06L28.5 18M6 28.5h18a4.5 4.5 0 0 0 4.5-4.5V6A4.5 4.5 0 0 0 24 1.5H6A4.5 4.5 0 0 0 1.5 6v18A4.5 4.5 0 0 0 6 28.5Z"
    />
  </svg>
)
export default AddVideo;
