import React, { useEffect, useRef, useState } from "react";
import Header from "../../shared/components/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store/store";
import Sidebar from "../../shared/components/Sidebar";
import { KanzRoles } from "../../enums/roles.enum";
import InvestorProfile from "./InvestorProfile";
import SyndicateProfile from "./SyndicateProfile";
import FundraiserProfile from "./FundraiserProfile";
import Modal from "../../shared/components/Modal";
import EditPhotoModal from "./EditPhotoModal";
import { getProfile } from "../../apis/investor.api";
import Spinner from "../../shared/components/Spinner";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const language: any = useSelector((state: RootState) => state.language.value);
  const metadata: any = useSelector((state: RootState) => state.metadata.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const [profile, setProfile]: any = useState();
  const [photoUploadModal, setPhotoUploadModal] = useState(false);
  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      setLoading(true);
      let { status, data } = await getProfile(authToken);
      if (status === 200) {
        setProfile(data?.status?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const showProfileDetails = () => {
    return metadata?.type === KanzRoles.INVESTOR ? (
      <InvestorProfile
        language={language}
        getDetail={getDetail}
        setLoading={setLoading}
        data={profile}
        setPhotoUploadModal={setPhotoUploadModal}
      />
    ) : metadata?.type === KanzRoles.SYNDICATE ? (
      <SyndicateProfile
        language={language}
        getDetail={getDetail}
        setLoading={setLoading}
        data={profile}
        setPhotoUploadModal={setPhotoUploadModal}
      />
    ) : metadata?.type === KanzRoles.FUNDRAISER ? (
      <FundraiserProfile
        language={language}
        getDetail={getDetail}
        setLoading={setLoading}
        data={profile}
        setPhotoUploadModal={setPhotoUploadModal}
      />
    ) : (
      <React.Fragment></React.Fragment>
    );
  };

  return (
    <main className="max-h-full">
      <Header />
      <aside className="w-full h-full flex items-start justify-start ">
        <Sidebar type={metadata?.type} />
        <section
          style={{
            width: "calc(100% - 250px)",
          }}
          className="bg-cbc-auth p-[4rem] h-[100vh] relative overflow-y-scroll w-full"
        >
          {loading ? (
            <div className="mt-48 w-full h-full grid place-items-center">
              <Spinner />
            </div>
          ) : (
            <div>
              <section className="inline-flex justify-between items-start w-full">
                <div className="w-full">
                  <h1 className="text-black font-medium text-2xl mb-5">
                    {language?.v3?.profile?.profile}
                  </h1>
                </div>
              </section>

              <aside>
                <div className="flex flex-col pb-10">
                  {showProfileDetails()}
                </div>
              </aside>
            </div>
          )}
        </section>
      </aside>
      <Modal show={photoUploadModal ? true : false} className="w-full">
        <EditPhotoModal
          language={language}
          authToken={authToken}
          getDetail={getDetail}
          imageUrl={profile?.profile_picture_url}
          setPhotoUploadModal={setPhotoUploadModal}
          setLoading={setLoading}
        />
      </Modal>
    </main>
  );
};

export default Profile;
