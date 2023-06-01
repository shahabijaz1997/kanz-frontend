import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useLayoutEffect, useEffect } from "react";

import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RootState } from "../../../redux-toolkit/store/store";
import { AntdInput } from "../../../shared/components/Input";
import { getCountries } from "../../../apis/countries.api";
import Selector from "../../../shared/components/Selector";
import Header from "../../../shared/components/Header";
import Drawer from "../../../shared/components/Drawer";
import Button from "../../../shared/components/Button";
import { toastUtil } from "../../../utils/toast.utils";
import { realtorApi } from "../../../apis/investor.api";

type FormValues = {
  no_of_properties: number;
};

const Realtors = (props: any) => {
  const { disabled } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setOpen]: any = useState("");
  const [loading, setLoading] = useState(false);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [countries, setCountries] = useState([]);
  const [states, setStates]: any = useState();
  const [payload, setPayload]: any = useState({
    national: "",
    residence: "",
    noOfProperty: "",
  });
  const language: any = useSelector((state: RootState) => state.language.value);
  const requiredFieldError = language?.common?.required_field;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  useLayoutEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    const subscription = watch((value) =>
      onSetPayload(value.no_of_properties, "noOfProperty")
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const getAllCountries = async () => {
    try {
      let { status, data } = await getCountries(authToken);
      if (status === 200) {
        setCountries(data.status.data);
        if (data.status.data?.states?.[0]) {
          setStates(data.status.data?.states?.[0]);
        }
      }
    } catch (error) {
      console.error("Error while getting countries: ", error);
    }
  };

  const onSetPayload = (data: any, type: string) => {
    setPayload((prev: any) => {
      return { ...prev, [type]: data };
    });
    const states = countries?.find((item: any) => item?.name === data.value);
    if (states) {
      setStates(states);
    }
  };

  const _countries = countries?.map((item: any) => {
    return {
      label: item.name,
      value: item.name,
    };
  });

  const _states = states?.states?.map((item: any) => {
    return {
      label: item,
      value: item,
    };
  });

  const onSubmit: SubmitHandler<FormValues> = async () => {
    if (!payload.national || !payload.residence || !payload.noOfProperty)
      return toast.warning(
        language.promptMessages.pleaseSelectAllData,
        toastUtil
      );
    try {
      setLoading(true);

      let pData: any = {
        realtor: {
          meta_info: {
            nationality: payload?.national?.value,
            residence: payload?.residence?.value,
            noOfProperty: payload?.noOfProperty,
          },
        },
      };
      // note : change the api method with real api
      let { data, status } = await realtorApi(pData, authToken);
      if (status === 200) {
        toast.success(data?.status?.message, toastUtil);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.status?.message ||
        error?.response?.data ||
        language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        //  note: change route and state according to requirements
        //   navigate("/login", { state: "complete-details" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full max-h-full background-auth overflow-y-auto">
      <section className="h-[67px]">
        <Header />
      </section>
      <form className="pb-8 mb-4 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center">
          <div>
            <div className="w-[450px] mt-[78px]">Owner Info</div>
            <p className="text-neutral-500 font-normal text-sm">
              <span>{language.syndicate.subDetail}</span>&nbsp;
              <span
                className="color-blue font-medium cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {language.common.learn}
              </span>
            </p>
            <div className="bg-cbc-grey-sec pb-[18px]  pl-[18px] pr-[18px] pt-2.5 mt-[13px] rounded-[8px]">
              <section className="mb-4 w-full">
                <label
                  className="mb-2 block text-neutral-700 text-sm font-medium"
                  htmlFor="name"
                >
                  {language?.common?.national}
                </label>
                <div className="relative w-full" style={{ zIndex: 101 }}>
                  <Selector
                    disabled={disabled}
                    options={_countries && _countries}
                    onChange={(v: any) => onSetPayload(v, "national")}
                  />
                </div>
              </section>
              <section className="mb-4 w-full">
                <label
                  className="mb-2 block text-neutral-700 text-sm font-medium"
                  htmlFor="full-name"
                >
                  {language?.common?.residence}
                </label>
                <div className="relative w-full" style={{ zIndex: 100 }}>
                  <Selector
                    disabled={disabled}
                    options={_states && _states}
                    onChange={(v: any) => onSetPayload(v, "residence")}
                  />
                </div>
              </section>
              <section className="w-full">
                <label
                  className="mb-2 block text-neutral-700 text-sm font-medium"
                  htmlFor="full-name"
                >
                  {language?.common?.NoOfProperty}
                </label>
                <div className="relative w-full" style={{ zIndex: 99 }}>
                  <AntdInput
                    register={register}
                    name="no_of_properties"
                    type="number"
                    required
                    placeholder="No of Property"
                    error={errors.no_of_properties?.message} // Pass the error message from form validation
                    validation={{
                      required: requiredFieldError,
                    }}
                  />
                </div>
              </section>
            </div>
            <section className="w-full inline-flex items-center justify-between mt-16">
              <Button
                className="mt-6 h-[38px] w-[140px]"
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
          </div>
        </div>
      </form>
      <Drawer isOpen={isOpen} setIsOpen={(val: boolean) => setOpen(val)}>
        <div className="z-[103px]">
          <header className="font-bold text-xl">
            {language.philosophyGoals.objective}
          </header>
          <p className="text-neutral-700 font-normal text-sm text-justify">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl.
          </p>
        </div>
      </Drawer>
    </main>
  );
};
export default Realtors;
