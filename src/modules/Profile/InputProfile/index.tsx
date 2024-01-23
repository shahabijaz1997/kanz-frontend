const InputProfile = (props:any) => {
    return (
        <span className={` w-[60%] flex-col flex`}>
        <p className="text-xs mb-1 font-medium whitespace-nowrap">
          {props?.label}
        </p>
        <input
        value={props?.value}
          disabled={props?.disabled}
          className={`text-[10px] px-2 py-1.5 w-full border-[1px] focus:border-[#155E75] rounded-md ${props?.disabled ? "text-gray-400 cursor-not-allowed " : "bg-white"}`}
          type="text"
          onChange={(e)=>props?.onChange(e.target.value)}
        />
      </span>
    )
    
}

export default InputProfile