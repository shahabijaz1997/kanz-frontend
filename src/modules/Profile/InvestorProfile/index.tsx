import { useEffect, useState } from "react";
import EditIcon from "../../../ts-icons/editIcon.svg";
import InputProfile from "../InputProfile";
import Button from "../../../shared/components/Button";
import { updateProfile } from "../../../apis/investor.api";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store/store";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";

const InvestorProfile = ({ getDetail, setLoading, data, setPhotoUploadModal }: any) => {
  const [name, setName] = useState(data?.name);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const updateInfo = async () => {
    try {
      setLoading(true);
      let payload: any = {
      investor_attributes:{
        "name": name, 
      }
      };
      let { status, data } = await updateProfile(authToken, payload);
      if (status === 200) {
        toast.success("Profile Updated", toastUtil);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      getDetail()

    }
  };

  return (
    <section className="inline-flex justify-start gap-36 w-full">
      <div className="flex flex-col gap-8 w-[40%]">
        <span className="inline-flex justify-center gap-16 items-center">
          {
            <InputProfile
              disabled={false}
              label={"Name"}
              value={name}
              inputClass={"p-2 w-full border-[1px] bg-white text-[10px]"}
              onChange={setName}
            />
          }
          {
            <InputProfile
              disabled={true}
              label={"Email"}
              value={data?.email}
              inputClass={"p-2 w-full border-[1px] text-gray-400 text-[10px]"}
            />
          }
        </span>
        <span className="inline-flex justify-center gap-16 items-center">
          {
            <InputProfile
              disabled={true}
              label={"Nationality"}
              value={data?.profile?.en?.nationality}
              inputClass={"p-2 w-full border-[1px] text-gray-400 cursor-not-allowed text-[10px]"}
            />
          }
          {
            <InputProfile
              disabled={true}
              label={"Type"}
              value={data?.profile_states?.investor_type}
              inputClass={"p-2 w-full border-[1px]  text-[10px]"}
            />
          }
        </span>
        <span className="inline-flex justify-start w-[73%] items-center">
          {
            <InputProfile
              disabled={true}
              label={"Residence"}
              value={data?.profile?.en?.residence}
              inputClass={"p-2 w-full border-[1px] text-gray-400 cursor-not-allowed text-[10px]"}
            />
          }
        </span>

        <span className="flex mt-1 items-center justify-start"> 
            <Button disabled={!name} onClick={()=>{updateInfo()}} className="!p-2 !text-xs !font-medium" type="primary">Update</Button>
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
              src={
                data?.profile_picture_url ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
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

export default InvestorProfile;
