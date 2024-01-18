import React from "react";
import Spinner from "../../shared/components/Spinner";

const Profile = () => {
  return (
    <section
    className="bg-cbc-auth h-full p-[6rem] relative w-full"
  >
   
    {/*   <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
        <Spinner />
      </div> */}
      <React.Fragment>
        <section className="inline-flex justify-between items-center w-full">
          <div className="w-full">
            <h1 className="text-black font-medium text-2xl mb-2">
              {"Profile"}
            </h1>
          </div>
        </section>

      </React.Fragment>

  </section>
  );
};

export default Profile;
