import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";

import { RootState } from "../../../../redux-toolkit/store/store";
import { useNavigate } from "react-router-dom";
import {
  confirmToken,
  resendConfirmToken,
  signup,
} from "../../../../apis/auth.api";
import Spinner from "../../../../shared/components/Spinner";
import { toast } from "react-toastify";
import { toastUtil } from "../../../../utils/toast.utils";
import { saveToken } from "../../../../redux-toolkit/slicer/auth.slicer";
import { KanzRoles } from "../../../../enums/roles.enum";
import { AntdInput } from "../../../../shared/components/Input";

type FormValues = {
  code: string;
  email: string;
};

const EmailVerification = ({ payload }: any) => {
  // Refactor form
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [isEdit, setEdit] = useState(false);
  const [email, setEmail] = useState(payload?.email);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const requiredFieldError = language?.common?.required_field;

  const onReVerify = async (e: any) => {
    try {
      e.preventDefault();
      if (!email) return;
      setLoading(true);
      let role = localStorage.getItem("role");
      const { status, data } = await signup({
        user: {
          email,
          password: payload.password,
          name: payload.name,
          type: role || KanzRoles.INVESTOR,
        },
      });
      if (status === 200) {
        setEdit(false);
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.status?.message ||
        language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
    } finally {
      setLoading(false);
      setToken("");
    }
  };

  const onResendConfirmToken = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { status, data } = await resendConfirmToken(
        { user: { email } },
        authToken
      );
      if (status === 200) toast.success(data.status.message, toastUtil);
    } catch (error: any) {
      const message =
        error?.response?.data?.status?.message ||
        language.promptMessages.errorGeneral;
      toast.error(message, toastUtil);
    } finally {
      setLoading(false);
      setToken("");
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { code: token } = values;
    try {
      if (!token) return;
      setLoading(true);
      const { status, data, headers }: any = await confirmToken({
        confirmation_token: token,
      });
      if (status === 200 && headers["authorization"]) {
        const token = headers["authorization"].split(" ")[1];
        dispatch(saveToken(token));
        toast.success(data.status.message, toastUtil);
        localStorage.removeItem("role");
        navigate("/welcome");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.status?.message ||
        language.promptMessages.errorGeneral;
      toast.error("Authentication code is invalid", toastUtil);
    } finally {
      setLoading(false);
      setToken("");
    }
  };

  return (
    <section className="w-[428px] max-w-md pt-[130px] screen500:max-w-[300px]">
      <h2 className="text-2xl font-bold text-left text-neutral-900 mb-4">
        {language?.onboarding?.verificationCode}
      </h2>
      <h3 className="text-base font-normal text-left text-neutral-700 screen500:text-[12px]">
        {language?.onboarding?.verificationText}
      </h3>
      {!isEdit ? (
        <form className="pt-8 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-neutral-700 text-sm font-semibold mb-2 screen500:text-[12px]"
              htmlFor="code"
            >
              {language?.onboarding?.codeText}
            </label>
            <AntdInput
              register={register}
              name="code"
              type="text"
              required
              error={errors?.code?.message} // Pass the error message from form validation
              validation={{
                required: requiredFieldError,
              }}
            />
          </div>
          <div className="text-right text-neutral-500 font-normal text-[14px] screen500:text-[12px]">
            {language?.onboarding?.sentCode} ({email})
            <div
              className="color-blue cursor-pointer"
              onClick={onResendConfirmToken}
            >
              {language?.buttons?.resendVerification}{" "}
            </div>
          </div>

          {loading ? (
            <button
              className="text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10"
              type="submit"
            >
              <Spinner />
            </button>
          ) : (
            <button
              className={`${
                !token && "opacity-70"
              } text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10`}
              type="submit"
            >
              {language?.buttons?.verify}
            </button>
          )}
        </form>
      ) : (
        //  note : why we use this code
        <form className="pt-8 pb-8 mb-4" onSubmit={onReVerify}>
          <div className="mb-4">
            <label
              className="block text-neutral-700 text-sm font-semibold mb-2 screen500:text-[12px]"
              htmlFor="email"
            >
              {language?.common?.email}
            </label>
            <input
              className="h-[42px] shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {loading ? (
            <button
              className={`${
                !email && "opacity-70"
              } text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10`}
            >
              <Spinner />
            </button>
          ) : (
            <button
              className={`${
                !email && "opacity-70"
              } text-white text-sm tracking-[0.03em] bg-cyan-800 rounded-md focus:outline-none focus:shadow-outline w-full h-[38px] mt-10`}
              type="submit"
            >
              {language?.buttons?.continue}
            </button>
          )}
        </form>
      )}
    </section>
  );
};

export default EmailVerification;
