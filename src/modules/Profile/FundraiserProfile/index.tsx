import { useState } from "react";
import EditIcon from "../../../ts-icons/editIcon.svg";
import InputProfile from "../InputProfile";
import Button from "../../../shared/components/Button";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import { updateProfile } from "../../../apis/investor.api";
import { RootState } from "../../../redux-toolkit/store/store";
import { useSelector } from "react-redux";

const FundRaiserProfile = ({
  setLoading,
  getDetail,
  data,
  setPhotoUploadModal,
}: any) => {
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [name, setName] = useState(data?.name);
  const [comapnyName, setCompanyName] = useState(data?.profile?.company_name);
  const [legalName, setLegalname] = useState(data?.profile?.legal_name);
  const [website, setWebsite] = useState(data?.profile?.website);
  const [description, setDescription] = useState(data?.profile?.description);
  const [address, setAddress] = useState(data?.profile?.address);
  const [ceoName, setCeoName] = useState(data?.profile?.ceo_name);
  const [ceoEmail, setCeoEmail] = useState(data?.profile?.ceo_email);
  const updateInfo = async () => {
    try {
      setLoading(true);
      let payload: any = {
        user: {
          name: name,
          profile_pic:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          profile:{
          "company_name": comapnyName,  

          }  
        },
      };
      let { status, data } = await updateProfile(authToken, payload);
      if (status === 200) {
        toast.success("Profile Updated", toastUtil);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      getDetail();
    }
  };
  return (
    <section className="inline-flex justify-start gap-36 w-full max-h-full">
      <div className="flex flex-col gap-6 w-[40%]">
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Name"}
              value={name}
              onChange={setName}
            />
          }
          {<InputProfile disabled={true} label={"Email"} value={data?.email} />}
        </span>
        <span className="inline-flex justify-start w-[76%] gap-12 items-center">
          {
            <InputProfile
              disabled={true}
              label={"Nationality"}
              value={data?.profile?.en?.nationality}
            />
          }
        </span>
        <span className="inline-flex justify-start  font-medium items-center">
          Company Details
        </span>
        <span className="flex-col flex items-center justify-center">
          <img
            className="h-36 w-28"
            style={{
              objectFit: "cover",
              aspectRatio: "1",
            }}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <span className="text-[10px] font-medium mt-2">Logo</span>
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Company Name"}
              value={comapnyName}
              onChange={setCompanyName}
            />
          }
          {
            <InputProfile
              disabled={false}
              label={"Legal Name"}
              value={legalName}
              onChange={setLegalname}
            />
          }
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Website"}
              value={website}
              onChange={setWebsite}
            />
          }
          {
            <InputProfile
              disabled={false}
              label={"Industry/Market"}
              value={""}
            />
          }
        </span>
        <span className="inline-flex justify-start gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Address"}
              value={address}
              onChange={setAddress}
            />
          }
        </span>
        <span className="inline-flex justify-start gap-12 items-center">
          {
            <span className={` w-[60%] flex-col flex`}>
              <p className="text-xs mb-1 font-medium whitespace-nowrap">
                {"Description"}
              </p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`text-[10px] px-2 py-1.5 w-full border-[1px] rounded-md focus:border-none min-h-20 `}
              />
            </span>
          }
        </span>
        <span className="inline-flex justify-center gap-12 items-center">
          {
            <InputProfile
              disabled={false}
              label={"CEO name"}
              value={ceoName}
              onChange={setCeoName}
            />
          }
          {
            <InputProfile
              disabled={false}
              label={"CEO email"}
              value={ceoEmail}
              onChange={setCeoEmail}
            />
          }
        </span>

        <span className="flex mt-1 items-center justify-start">
          <Button
            onClick={() => {
              updateInfo();
            }}
            className="!p-2 !text-xs !font-medium"
            type="primary"
          >
            Update
          </Button>
        </span>
      </div>
      <span>
        <div>
          <div className="relative ">
            <img
              className="w-48 h-48 rounded-full bg-slate-100 border-[1px] shadow-lg"
              style={{
                objectFit: "cover",
                aspectRatio: "1",
              }}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <span
              onClick={() => {
                setPhotoUploadModal(true);
              }}
              className="bottom-0 left-9 absolute cursor-pointer w-6 h-6 hover:bg-slate-100 bg-white rounded-full flex items-center justify-center"
            >
              <EditIcon className="w-4 h-4" stroke="#000" />
            </span>
          </div>
        </div>
      </span>
    </section>
  );
};

export default FundRaiserProfile;
