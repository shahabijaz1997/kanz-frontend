const InputProfile = (props: any) => {
  return (
    <span className={` ${props?.width ? "w-[60%]" : "w-[90%]"} flex-col flex relative`}>
      <p className=" mb-1 font-medium whitespace-nowrap">{props?.label}</p>
      <input
        placeholder={props?.placeholder}
        value={props?.value}
        disabled={props?.disabled}
        className={`text-sm px-2 py-1.5 w-full  focus:border-[2px] rounded-md ${
          props?.disabled ? "text-gray-400 cursor-not-allowed " : "bg-white"
        } ${
          props?.value || props?.not_mandatory
            ? "border-gray-400 border-[1px]"
            : "border-red-500 border-[1px]"
        }`}
        type="text"
        onChange={(e) => props?.onChange(e.target.value)}
      />
      {props?.valid && (
        <span className="text-xs  text-red-500 absolute bottom-[-20px] font-medium">
          {props?.language?.v3?.profile?.please + props?.validationName}
        </span>
      )}
    </span>
  );
};

export default InputProfile;
