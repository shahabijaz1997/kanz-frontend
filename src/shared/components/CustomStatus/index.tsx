import React from "react";

const CustomStatus = ({ options }: any) => {
  options = options.charAt(0).toUpperCase() + options.slice(1);
  let backgroundColor = "bg-green-100";
  if (options === "Approved" || options === "Raising") {
    backgroundColor = "bg-green-100";
  } else if (options === "Pending") {
    backgroundColor = "bg-yellow-100";
  } else if (options === "Request change") {
    backgroundColor = "bg-indigo-100";
  } else if (options === "Closed") {
    backgroundColor = "bg-grey-100";
  }

  let textColor = "text-green-800";
  if (options === "Approved") {
    textColor = "text-green-800";
  } else if (options === "Pending") {
    textColor = "text-yellow-700";
  } else if (options === "Request change") {
    textColor = "text-indigo-800";
  }
  return (
    <main>
      <section>
        <span
          className={`font-semibold px-4 w-fit capitalize ${backgroundColor} rounded-xl text-center py-[2px] w-[80px] ${textColor}`}
        >
          {options}
        </span>
      </section>
    </main>
  );
};

export default CustomStatus;
