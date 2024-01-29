import MultipleDownArrow from "../../../../../../ts-icons/MultipleDownArrow.svg";
import MultipleUpArrow from "../../../../../../ts-icons/MultipleUpArrow.svg";

const MultipleDecider = ({ multiple , large = false }: any) => {
  const decider = (value: any) => {
    return value < 1.0 ? (
      <span className="inline-flex items-center gap-1 text-[#F04438] font-normal">
        <MultipleDownArrow large={large} />
        <span>{value + 'x'}</span>
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 text-[#155E75] font-normal">
        <MultipleUpArrow large={large} />
        <span>{value + 'x'}</span>
      </span>
    );
  };

  return (
      decider(multiple)
  );
};

export default MultipleDecider;
