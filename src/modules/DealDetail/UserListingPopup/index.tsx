import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../shared/components/Button";
import { RootState } from "../../../redux-toolkit/store/store";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getAllSyndicates } from "../../../apis/syndicate.api";
import {postInviteSyn} from "../../../apis/deal.api"
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";
import SearchIcon from "../../../ts-icons/searchIcon.svg";
import { KanzRoles } from '../../../enums/roles.enum';
import { toastUtil } from "../../../utils/toast.utils";
import { toast } from 'react-toastify';


interface Syndicate {
  id: number;
  title: React.ReactNode;
  handle: string;
  action: React.ReactNode;
}



const UserListingPopup = ({dealId,type}: any) => {

  function copyToClipboard() {
    const clipboard = navigator.clipboard;
    clipboard.writeText(window.location.href);
    toast.success(`${language?.v3?.button?.copy_link_success}`, toastUtil)  
  
  }


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [loading, setLoading] = useState<boolean>(false);
  const [syndicates, setSyndicates] = useState<Syndicate[]>([]);

  useEffect(() => {
    dispatch(saveDataHolder(""));
    getAllUserListings();
  }, [type]);

  const getAllUserListings = async () => {
    try {
      setLoading(true);
      let results:any;
      if (type === KanzRoles.SYNDICATE)
        results = await getAllSyndicates(authToken);
      let { status, data } = results;
      if (status === 200) {
        let syndicatesData = data?.status?.data || [];
        let syndicates: Syndicate[] = syndicatesData.map((syndicate: any) => ({
          id: syndicate?.id,
          title: syndicate?.name,
          handle: syndicate?.handle || "N/A",
            action: (
              <Button
              divStyle="items-center justify-end max-w-fit"
              type="outlined"
              
              className="!p-3 !py-1 !rounded-full"
                    onClick={() => onInviteSyndicate(syndicate?.id)}
            >
              Invite
            </Button>
            
            
          ),
        })); 
          setSyndicates(syndicates);
      
      }
    } catch (error: any) {
 
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.STARTUP_DASHBOARD });
      }
    } finally {
      setLoading(false);
    }
    };
    
    const onInviteSyndicate = async(id:any) => {
        try {
            await postInviteSyn({
                "message": "You have been invited",
                "invitee_id": id
            },
                dealId,
            authToken
            )
        } catch (error:any) {
            
        if (error.response && error.response.status === 400)
        {
            toast.warn("Already Invited",toastUtil)
      }    
      if (error.response && error.response.status === 401) {
        dispatch(saveToken(""));
        navigate(RoutesEnums.LOGIN, { state: RoutesEnums.STARTUP_DASHBOARD });
      }
        }
    }

  return (
      <section className="absolute p-5 bg-white border-[1px] border-neutral-200 rounded-md w-[400px] right-0 top-[100%]">
           <div className="rounded-md shadow-cs-6 bg-white border-[1px] border-gray-200 h-9 overflow-hidden w-full inline-flex items-center px-2">
           <SearchIcon />
            <input type="search" className="h-full w-full outline-none pl-2 pr-[6.5rem] text-sm font-normal text-gray-400" placeholder={language?.v3?.common?.search} />
             </div>
            {React.Children.toArray(
          syndicates.map((syndicate: Syndicate) => (
              <div className='py-4 border-b-[1px] border-b-neutral-200 w-full inline-flex items-center justify-between'>
                  <p>{syndicate.title}</p>
              {syndicate.action}            
            </div>
          ))
      )}
      <span>
        
      <Button type='outlined' onClick={() => {copyToClipboard()}}  className="w-full">{language?.v3?.button?.invite_link}</Button>

      </span>
      
    </section>
  );
};

export default UserListingPopup;

/* 
onClick={() => {

    let  inviteResponse =  postInviteSyn({
         "message": "You have been invited",
         "invitee_id": syndicate?.id
     },
         dealId,
     authToken
     )
let { status, data } = inviteResponse;
if(status)       
     

}} */