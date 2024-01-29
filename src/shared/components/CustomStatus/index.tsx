import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";

const CustomStatus = ({ options }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  let backgroundColor = "bg-green-100";
  if (
    options === language?.v3?.status?.approved ||
    options === language?.v3?.status?.raising
  ) {
    backgroundColor = "bg-green-100";
  } else if (options === language?.v3?.status?.pending) {
    backgroundColor = "bg-yellow-100";
  } else if (options === language?.v3?.status?.verified) {
    backgroundColor = "bg-orange-100";
  } else if (options === language?.v3?.status?.interested) {
    backgroundColor = "bg-blue-100";
  } else if (options === language?.v3?.status?.draft) {
    backgroundColor = "bg-indigo-100";
  } else if (options === language?.v3?.status?.closed) {
    backgroundColor = "bg-grey-100";
  } else if (
    options === language?.v3?.fundraiser?.no ||
    options === "rejected"
  ) {
    backgroundColor = "bg-red-100";
  } else if (options === language?.v3?.status?.follower) {
    backgroundColor = "bg-blue-100";
  } else if (options === language?.v3?.status?.not_invited) {
    backgroundColor = "bg-[#F5F5F5]";
  } else if (options === "LP") {
    backgroundColor = "bg-[#F5F5F5]";
  } else if (options === "closed") {
    backgroundColor = "bg-[#F5F5F5]";
  }

  let textColor = "text-green-800";
  if (options === language?.v3?.status?.approved) {
    textColor = "text-green-800";
  } else if (options === language?.v3?.status?.interested) {
    textColor = "text-slate-800";
  } else if (options === language?.v3?.status?.pending) {
    textColor = "text-yellow-800";
  } else if (options === language?.v3?.status?.draft) {
    textColor = "text-indigo-800";
  } else if (
    options === language?.v3?.fundraiser?.no ||
    options === "rejected"
  ) {
    textColor = "text-red-800";
  } else if (options === language?.v3?.status?.follower) {
    textColor = "text-blue-800";
  } else if (options === language?.v3?.status?.not_invited) {
    textColor = "text-[#F5F5F5]-800";
  } else if (options === "LP") {
    textColor = "text-[#000]";
  } else if (options === "closed") {
    textColor = "text-[#000]";
  }
  return (
    <main>
      <section>
        <span
          className={`  px-4 w-fit capitalize ${backgroundColor} rounded-xl text-center py-1.5 w-[80px] ${textColor}`}
        >
          {options}
        </span>
      </section>
    </main>
  );
};

export default CustomStatus;
