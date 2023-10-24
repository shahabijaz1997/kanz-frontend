import * as React from "react"
import { SVGProps } from "react"
const Zoomin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#404040"
      d="M15.72 14.717c.311.354.321.707.03 1.06a.722.722 0 0 1-.53.22.722.722 0 0 1-.53-.22l-4.18-4.179c-1.122.915-2.463 1.383-4.023 1.404-1.83-.042-3.358-.676-4.584-1.903C.676 9.873.042 8.344 0 6.515c.042-1.83.676-3.358 1.903-4.585C3.129.703 4.658.069 6.487.027c1.83.042 3.358.676 4.585 1.903 1.227 1.227 1.861 2.755 1.903 4.585-.021 1.538-.5 2.88-1.435 4.023l4.18 4.18Zm-9.233-3.212c1.414-.042 2.589-.53 3.525-1.466.935-.936 1.424-2.11 1.465-3.524-.041-1.414-.53-2.589-1.465-3.525-.936-.935-2.11-1.424-3.525-1.466-1.414.042-2.588.53-3.524 1.466-.936.936-1.424 2.11-1.466 3.525.042 1.414.53 2.588 1.466 3.524.936.936 2.11 1.424 3.524 1.466Zm2.495-5.739c.458.042.707.291.749.749-.042.457-.312.707-.811.748H7.173V9.01c-.02.457-.26.707-.717.748-.437-.041-.676-.29-.717-.748V7.263H3.96c-.437-.041-.676-.29-.717-.748.041-.458.28-.707.717-.749h1.778V4.02c0-.208.073-.385.218-.53a.722.722 0 0 1 .53-.219c.437.042.676.291.718.749v1.746h1.777Z"
    />
  </svg>
)
export default Zoomin;