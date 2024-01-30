const InputProfile = (props: any) => {
  return (
    <span className={` w-[60%] flex-col flex`}>
      <p className=" mb-1 font-medium whitespace-nowrap">{props?.label}</p>
      <input
        placeholder={props?.placeholder}
        value={props?.value}
        disabled={props?.disabled}
        className={`text-sm px-2 py-1.5 w-full  focus:border-[2px] rounded-md ${
          props?.disabled ? "text-gray-400 cursor-not-allowed " : "bg-white"
        } ${props?.value ? "border-gray-400 border-[1px]" : "border-red-500 border-[1px]"}`}
        type="text"
        onChange={(e) => props?.onChange(e.target.value)}
      />
      {props?.valid && (
      <span className="text-xs mt-2 px-1 text-red-500 font-medium">{"Please enter a valid " + props?.validationName}</span>
      )}
    </span>
  );
};

export default InputProfile;
