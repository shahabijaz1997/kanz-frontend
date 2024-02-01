import React, { useState } from 'react';
import CrossIcon from '../../ts-icons/crossIcon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-toolkit/store/store';
import AddImage from '../../ts-icons/addImageIcon.svg';
import Button from '../../shared/components/Button';
import { fileSize } from '../../utils/files.utils';
import { toast } from 'react-toastify';
import { toastUtil } from '../../utils/toast.utils';
import { postDealUpdate } from '../../apis/syndicate.api';
import Loader from '../../shared/views/Loader';

const UpdateModal = ({ setOpen, id }: any) => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);

  const [description, setDescription] = useState('');
  const [file, setFileInformation] = useState('');
  const [loader, setLoader] = useState(false);
  const handleFileUpload = (e: any) => {
    const file: any = e.target.files?.[0];
    if (file) {
      const fileSizeInMB = fileSize(file.size, 'mb');

      if (fileSizeInMB > 10) {
        toast.error(language?.v3?.fundraiser?.file_size_err, toastUtil);
        navigator.vibrate(1000);
        return;
      }

      const allowedFileTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(language?.v3?.fundraiser?.file_type_err, toastUtil);
        return;
      }
      setFileInformation(file);
      e.target.value = '';
    }
  };

  const handleUpdate = () => {
    const deal_update = {
      description,
      report: file,
      deal_id: id,
    };

    setLoader(true);
    postDealUpdate(deal_update, authToken)
      .then(() => {
        setOpen(false);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        toast.error(err?.response?.data?.status?.message, toastUtil);
      });
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className='h-2/3 w-full bg-white rounded-lg ml-64 mr-64 p-6 text-center'>
          <CrossIcon
            stroke='#171717'
            className='w-6 h-6 absolute right-8 cursor-pointer'
            onClick={() => setOpen(false)}
          />
          <div className='mt-12'>
            <h1 className='text-xl font-bold'>
              {language?.v3?.syndicate?.update_deals}
            </h1>
          </div>
          <div className='text-left ml-24 border-t-2 w-9/12 mt-6'>
            <p className='font-normal text-sm text-cc-gray-100 pt-6 -mb-6'>
              {language?.v3?.syndicate?.document}
            </p>
            <br />
            <p className='font-medium text-sm'>
              {language?.v3?.syndicate?.upload_y_document}
            </p>
          </div>
          <div className='inline-flex items-center flex-col align-center justify-center w-3/4 cursor-pointer border-dashed border-2 p-8 mt-3'>
            <AddImage stroke='#A3A3A3' />
            <button
              onClick={() => {
                let elem: any = document.getElementById('post_uploader');
                elem.click();
              }}
            >
              <p className='font-medium my-2'>
                <small className='text-sm text-cc-blue-100 font-medium'>
                  {language.buttons.uploadFile}
                </small>
                <small className='font-medium text-sm text-cc-gray-100'>
                  {language.buttons.drag_n_drop}
                </small>
              </p>
              <small className='text-cc-gray-100 text-xs font-normal'>
                {language?.v2?.common?.imageSpecs2} 10MB
              </small>
            </button>
            <input
              required
              onChange={handleFileUpload}
              id={'post_uploader'}
              type='file'
              className='hidden'
            />
          </div>
          <div className=' mt-6 justify-center text-center'>
            <p className=' text-left text-base text-cc-gray-200 ml-24'>
              {language?.v3?.deal?.description}
            </p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={'Brief description of the valuation update'}
              className={`text-[10] px-2 py-1.5 w-9/12 border-[1px] rounded-md focus:border-none h-32 custom-scroll mt-2`}
            />
          </div>

          <footer className='w-[60%] inline-flex justify-center gap-10 py-6 px-3'>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              type='outlined'
              className='w-full !py-1'
              divStyle='flex items-center justify-center w-full'
            >
              {language?.v3?.button?.cancel}
            </Button>
            <Button
              onClick={handleUpdate}
              className='w-full !py-1'
              divStyle='flex items-center justify-center w-full'
            >
              {language?.v3?.button?.update}
            </Button>
          </footer>
        </div>
      )}
    </>
  );
};

export default UpdateModal;
