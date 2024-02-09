const NumericInput = (props: any) => {
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 8) return;
    if (["-", "e", "E", "+"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length >= 10) {
      e.preventDefault();
    }
  };
  return (
    <span
      className={` ${
        props?.width ? "w-[60%]" : "w-[90%]"
      } flex-col flex relative`}
    >
      <p className=" mb-1 font-medium whitespace-nowrap">{props?.label}</p>
      <input
        min={0}
        required
        value={props?.value}
        onChange={(e: any) => {
          let inputValue = e.target.value.replace(/[^\d.]/g, "");
          if (inputValue.length > 10) {
            inputValue = inputValue.slice(0, 10);
          }
          if (/^\d*\.?\d*$/.test(inputValue) || !inputValue) {
            props?.onChange(inputValue);
          }
        }}
        onKeyDown={handleKeyDown}
        type="number"
        pattern="[0-9]*"
        className="text-sm px-2 py-1.5 w-full  focus:border-[2px] rounded-md bg-white border-gray-400 border-[1px]"
        maxLength={10}
      />
    </span>
  );
};

export default NumericInput;
