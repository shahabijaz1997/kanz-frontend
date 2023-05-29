import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../../../../shared/components/CountrySelector";
import { InvestorType } from "../../../../enums/types.enum";
import { investmentAccridiation } from "../../../../apis/investor.api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import Spinner from "../../../../shared/components/Spinner";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import Drawer from "../../../../shared/components/Drawer";
import Button from "../../../../shared/components/Button";

const Firm = ({ language }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [assertQuestions] = useState([
    {
      id: 1,
      title: language?.firm?.option1,
      low_limit: "100",
      upper_limit: "100",
      is_range: false,
      currency: language.common.million,
    },
    {
      id: 2,
      title: language?.firm?.option2,
      low_limit: "50",
      upper_limit: "100",
      is_range: false,
      currency: language.common.million,
    },
    {
      id: 3,
      title: language?.firm?.option3,
      low_limit: "10",
      upper_limit: "50",
      is_range: false,
      currency: language.common.million,
    },
    {
      id: 4,
      title: language?.firm?.option4,
      low_limit: "1",
      upper_limit: "10",
      is_range: false,
      currency: language.common.million,
    },
  ]);
  const [selectedAssert, setSelectedAssert]: any = useState(null);
  const [payload, setPayload]: any = useState({
    legal: "",
    residence: "",
    accer: "",
    risk: false,
  });
  const [loading, setLoading] = useState(false);
  const [riskChecked, setRiskChecked] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const onSetPayload = (data: any, type: string) => {
    setPayload((prev: any) => {
      return { ...prev, [type]: data };
    });
  };

  useLayoutEffect(() => {
    let data = localStorage.getItem("account_info");
    let assertData = localStorage.getItem("accert");
    if (data) setPayload(JSON.parse(data));
    if (assertData) setSelectedAssert(JSON.parse(assertData));
  }, []);

  const addinvestmentAccridiation = async (e: any) => {
    e.preventDefault();
    if (
      !selectedAssert?.id ||
      !payload.legal ||
      !payload.residence ||
      !riskChecked
    )
      return toast.warning(
        language.promptMessages.pleaseSelectAllData,
        toastUtil
      );
    try {
      setLoading(true);

      let pData: any = {
        investor: {
          meta_info: {
            legal_name: payload?.legal,
            location: payload?.residence?.country_name,
            accreditation: selectedAssert,
            lower_limit: selectedAssert.low_limit,
            upper_limit: selectedAssert.upper_limit,
            accept_investment_criteria: String(selectedAssert.low_limit),
          },
        },
      };
      let { data, status } = await investmentAccridiation(pData, authToken);
      if (status === 200) {
        toast.success(data?.status?.message, toastUtil);
        navigate("/complete-goals", {
          state: { type: InvestorType.FIRM, selected: selectedAssert },
        });
        localStorage.setItem("account_info", JSON.stringify(payload));
        localStorage.setItem("accert", JSON.stringify(selectedAssert));
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.status?.message ||
        error?.response?.data ||
        language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate("/login", { state: `complete-details` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="pt-12 pb-8 mb-4 w-full"
      onSubmit={addinvestmentAccridiation}
    >
      <section className="mb-8 w-full">
        <label
          className="block text-neutral-700 text-sm font-medium"
          htmlFor="full-name"
        >
          {language?.common?.legalName}
        </label>
        <input
          className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
          id="full-name"
          type="text"
          value={payload.legal}
          onChange={(e) => onSetPayload(e.target.value, "legal")}
        />
      </section>
      <section className="mb-8 w-full relative" style={{ zIndex: 90 }}>
        <label
          className="block text-neutral-700 text-sm font-medium"
          htmlFor="full-name"
        >
          {language?.common?.location}
        </label>
        <CountrySelector
          onChange={(v: any) => onSetPayload(v, "residence")}
          selectedValue={payload.residence}
        />
      </section>

      <section className="mb-8 w-full relative">
        <label
          className="block text-neutral-700 text-sm font-medium"
          htmlFor="full-name"
        >
          {language?.individual?.accerQuestion}
        </label>
        <ul>
          {React.Children.toArray(
            assertQuestions.map((as) => {
              return (
                <li
                  className={`h-[50px] w-[420px] p-4 grey-neutral-200 text-sm font-medium cursor-pointer border border-grey inline-flex items-center justify-start first:rounded-t-md last:rounded-b-md screen500:w-full ${
                    selectedAssert?.id === as.id
                      ? "check-background"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedAssert(as)}
                >
                  <input
                    className="accent-cyan-800 relative float-left mr-2 h-3 w-3 rounded-full border-2 border-solid border-cyan-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04]"
                    type="radio"
                    checked={selectedAssert?.id === as.id ? true : false}
                  />
                  <small>{as.title}</small>
                </li>
              );
            })
          )}
        </ul>
      </section>

      <section className="relative z-10 w-full inline-flex items-start gap-2 rounded-md border border-grey w-[420px] p-4 check-background cursor-pointer">
        <input
          type="checkbox"
          className="accent-cyan-800 h-3 w-3 cursor-pointer"
          checked={riskChecked}
          onChange={() => setRiskChecked(!riskChecked)}
        />
        <div>
          <h3 className="text-neutral-700 font-medium text-[14px] leading-none">
            {language?.common?.risk}
          </h3>
          <p className="text-neutral-500 text-sm font-normal mt-1">
            {language?.individual?.understanding}&nbsp;
            <span
              className="color-blue font-medium cursor-pointer"
              onClick={() => setOpen(true)}
            >
              {language?.common?.learn}
            </span>
          </p>
        </div>
      </section>

      <section className="w-full inline-flex items-center justify-between mt-16">
        <Button
          className="mt-6 h-[38px] w-[140px]"
          htmlType="submit"
          type="outlined"
          onClick={() => navigate(-1)}
        >
          {language?.buttons?.back}
        </Button>
        <Button
          className="mt-6 h-[38px] w-[140px]"
          disabled={loading}
          htmlType="submit"
          loading={loading}
        >
          {language?.buttons?.continue}
        </Button>
      </section>

      <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
        <header className="font-bold text-xl">
          {language.philosophyGoals.whyToDo}
        </header>
        <p className="text-neutral-700 font-normal text-sm text-justify">
          Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent auctor purus luctus enim
          egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
          Suspendisse ac rhoncus nisl.
        </p>
      </Drawer>
    </form>
  );
};
export default Firm;
