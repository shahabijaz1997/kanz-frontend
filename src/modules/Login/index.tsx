import React, { useState, useLayoutEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { toastUtil } from "../../utils/toast.utils";
import Dropdown from "../../shared/components/Dropdown";
import { languageDropdownItems } from "../../utils/dropdown-items.utils";
import ClippedBanner from "../Onboarding/components/ClippedBanner";
import { isValidEmail } from "../../utils/regex.utils";
import InformationIcon from "../../ts-icons/InformationIcon.svg";
import EyeIcon from "../../ts-icons/EyeIcon.svg";
import EyeSlash from "../../ts-icons/EyeSlashIcon.svg";
import Spinner from "../../shared/components/Spinner";
import { saveToken } from "../../redux-toolkit/slicer/auth.slicer";
import { signin } from "../../apis/auth.api";
import { KanzRoles } from "../../enums/roles.enum";
import { saveUserData } from "../../redux-toolkit/slicer/user.slicer";
import Button from "../../shared/components/Button";
import { AntdInput } from "../../shared/components/Input";

type FormValues = {
  email: string;
  password: string;
};

const Login = ({}: any) => {
  const { state } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const language: any = useSelector((state: RootState) => state.language.value);
  const [loading, setLoading] = useState(false);
  const requiredFieldError = language?.common?.required_field;

  useLayoutEffect(() => {
    if (authToken) navigate("/welcome");
  }, []);

  // Refactor form
  const Form = () => {
    const {
      register,
      handleSubmit,
      setError,
      getValues,
      formState: { errors },
    } = useForm<FormValues>();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
      try {
        setLoading(true);
        const { status, data, headers } = await signin({
          user: { email: values?.email, password: values?.password },
        });
        if (status === 200 && headers["authorization"]) {
          const token = headers["authorization"].split(" ")[1];
          dispatch(saveToken(token));
          dispatch(saveUserData(data.status.data));
          toast.success(data.status.message, toastUtil);
          localStorage.removeItem("role");
          if (state) navigate(`/${state}`);
          else navigate("/welcome");
        } else toast.error(language.promptMessages.errorGeneral, toastUtil);
      } catch (error: any) {
        const message =
          error?.response?.data || language.promptMessages.errorGeneral;
        toast.error(message, toastUtil);
      } finally {
        setLoading(false);
      }
    };

    return (
      <form
        autoComplete="off"
        noValidate
        className="pt-10 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 relative">
          <AntdInput
            register={register}
            name="email"
            label={language?.common?.email}
            type="email"
            required
            placeholder="you@example.com"
            error={errors.email?.message} // Pass the error message from form validation
            validation={{
              required: requiredFieldError,
              pattern: {
                value: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
                message: "Invalid email address",
              },
            }}
          />
        </div>
        <div className="mt-6 mb-8 relative">
          <AntdInput
            register={register}
            name="password"
            label={language?.common?.password}
            type={showPassword ? "text" : "password"}
            required
            placeholder="**********"
            error={errors.password?.message} // Pass the error message from form validation
            validation={{
              required: requiredFieldError,
            }}
            ShowPasswordIcon={
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <EyeIcon stroke="rgb(64 64 64)" />
                ) : (
                  <EyeSlash stroke="rgb(64 64 64)" />
                )}
              </button>
            }
          />
        </div>
        <Button
          className="w-full h-[38px]"
          disabled={loading}
          htmlType="submit"
          loading={loading}
        >
          {language?.buttons?.signin}
        </Button>
        <div className="flex justify-end my-[12px]">
          <p className="text-neutral-500 text-left">
            {language.buttons.notRegistered}{" "}
          </p>
          &nbsp;
          <button
            className="text-cyan-800 font-bold cursor-pointer"
            type="button"
            onClick={() => navigate("/signup", { state: KanzRoles.INVESTOR })}
          >
            {language.buttons.signup}
          </button>
        </div>
      </form>
    );
  };
  return (
    <main className="h-full max-h-full background-auth overflow-y-auto">
      <ClippedBanner />
      <section className="h-full w-[55%] inline-block align-top screen991:w-full">
        <aside className="inline-flex flex-col items-center justify-center w-full h-full">
          <section className="absolute top-[26px] right-[5%] w-full text-right">
            <Dropdown dropdownItems={languageDropdownItems} />
          </section>
          <section className="w-[428px] max-w-md pt-[130px] screen500:max-w-[300px]">
            <h2 className="text-[24px] font-bold text-left text-neutral-900 screen500:text-[20px]">
              {language?.onboarding?.loginKanz}
            </h2>
            <Form />
          </section>
        </aside>
      </section>
    </main>
  );
};
export default Login;
