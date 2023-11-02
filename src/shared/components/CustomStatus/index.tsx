import React from "react";

const CustomStatus = ({ options }: any) => {
  let backgroundColor = "bg-green-100";
  if (options === "Approved" || options === "Raising") {
    backgroundColor = "bg-green-100";
  } else if (options === "pending") {
    backgroundColor = "bg-yellow-100";
  } else if (options === "interested") {
    backgroundColor = "bg-blue-100";
  } else if (options === "req changes") {
    backgroundColor = "bg-indigo-100";
  } else if (options === "closed") {
    backgroundColor = "bg-grey-100";
  }

  let textColor = "text-green-800";
  if (options === "approved") {
    textColor = "text-green-800";
  } else if (options === "interested") {
    textColor = "text-slate-800";
  } else if (options === "pending") {
    textColor = "text-yellow-700";
  } else if (options === "req changes") {
    textColor = "text-indigo-800";
  }
  return (
    <main>
      <section>
        <span
          className={`font-semibold  px-4 w-fit capitalize ${backgroundColor} rounded-xl text-center py-1.5 w-[80px] ${textColor}`}
        >
          {options}
        </span>
      </section>
    </main>
  );
};

export default CustomStatus;
