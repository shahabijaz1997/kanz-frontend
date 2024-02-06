import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { KanzRoles } from '../../enums/roles.enum';
import { RootState } from '../../redux-toolkit/store/store';
import Header from '../../shared/components/Header';
import Sidebar from '../../shared/components/Sidebar';
import Chevrond from '../../ts-icons/chevrond.svg';
import Button from '../../shared/components/Button';
import Spinner from '../../shared/components/Spinner';
import ArrowIcon from '../../ts-icons/arrowIcon.svg';
import DownloadIcon from '../../ts-icons/downloadIcon.svg';
import Modal from '../../shared/components/Modal';
import CrossIcon from '../../ts-icons/crossIcon.svg';
import FileSVG from '../../assets/svg/file.svg';
import CurrencySVG from '../../assets/svg/currency.svg';

import { comaFormattedNumber, timeAgo } from '../../utils/object.utils';
import { DealCheckType, DealStatus, FileType } from '../../enums/types.enum';
import {
  addCommentOnDeal,
  getDealDetail,
  requestSyndication,
  syndicateApprove,
} from '../../apis/deal.api';

import UpdateModal from './UpdateModal';
import { toast } from 'react-toastify';
import { toastUtil } from '../../utils/toast.utils';
import UploadIcon from '../../ts-icons/uploadIcon.svg';
import BinIcon from '../../ts-icons/binIcon.svg';
import { fileSize } from '../../utils/files.utils';
import InvitesListing from './InvitesListing';
import { RoutesEnums } from '../../enums/routes.enum';
import { getDownloadDocument, investSyndicate } from '../../apis/syndicate.api';
import Investors from './DealInvestors';
import { convertStatusLanguage } from '../../utils/string.utils';
import CurrencyConversionModal from './CurrencyConversionModal';
import { revertInvestment } from './CommonFunctions';

const CLOSED = 'closed';

const StartupCase = ({
  dealToken,
  dealDetail,
  docs,
  returnPath,
  pitchDeck,
}: any) => {
  const navigate = useNavigate();
  const language: any = useSelector((state: RootState) => state.language.value);
  const event: any = useSelector((state: RootState) => state.event.value);
  const authToken: any = useSelector((state: RootState) => state.auth.value);
  const user: any = useSelector((state: RootState) => state.user.value);
  const orientation: any = useSelector(
    (state: RootState) => state.orientation.value
  );
  const [files, setFiles]: any = useState([]);
  const [deal, setDeal]: any = useState(dealDetail);
  const [selectedDocs, setSelectedDocs]: any = useState(docs);
  const [invited, setInvited]: any = useState();
  const [loading, setLoading]: any = useState(false);
  const [fileLoading, setFileLoading]: any = useState(false);
  const [modalOpen, setModalOpen]: any = useState(null);
  const [modalOpen2, setModalOpen2]: any = useState(null);
  const [modalOpen3, setModalOpen3]: any = useState(null);
  const [modalOpenSyndication, setModalOpenSyndication]: any = useState(null);
  const [disableUpload, setdisableUpload]: any = useState(false);
  const [modalOpenComment, setmodalOpenComment]: any = useState(null);
  const [InvestButtonDisable, setInvestButtonDisable]: any = useState(false);

  const [investmentAmount, setAmount] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const [modalOpenConversion, setModalOpenConversion]: any = useState(false);
  const [updateModal, setUpdateModal]: any = useState(false);

  const handleAmountChange = (event: any) => {
    if (event.target.value !== 0) setAmount(event.target.value);
  };

  const [changes, setChanges]: any = useState({
    comment: '',
    action: '',
    document: null,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (file) {
      const fileSizeInMB = fileSize(file.size, 'mb');
      const allowedFileTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'application/pdf',
      ];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(language?.v3?.fundraiser?.file_type_err, toastUtil);
        return;
      }
      if (fileSizeInMB > 10) {
        toast.error(language?.v3?.fundraiser?.file_size_err, toastUtil);
        navigator.vibrate(1000);
        return;
      }
      setFileInformation(file);
      e.target.value = '';
    }
  };

  const setFileInformation = async (file: File) => {
    let size = fileSize(file.size, 'mb');
    let type;
    setLoading(true);
    if (file.type.includes('video')) type = FileType.VIDEO;
    else if (file.type.includes('image')) {
      type = FileType.IMAGE;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img: any = new Image();
        img.src = reader.result;
      };
    } else {
      type = FileType.PDF;
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
    /* const fileData: any = await handleFileRead(file); */
    doUploadUtil(file, size, type);
    setLoading(false);
  };

  const doUploadUtil = (file: any, size: any, type: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, size, type, id: prev.length + 1 }];
    });

    let timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };

  useEffect(() => {
    deal && (deal?.invite ? setInvited(true) : setInvited(false));
  }, [deal]);

  const onGetdeal = async () => {
    try {
      setLoading(true);
      let { status, data } = await getDealDetail(dealToken, authToken);
      if (status === 200) {
        setDeal(data?.status?.data);
        setSelectedDocs(data?.status?.data?.docs[0]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const onDownloadDocument = async (documentID: any, authToken: any) => {
    try {
      setLoading(true);
      let { status, data } = await getDownloadDocument(documentID, authToken);
      if (status === 200) {
        window.open(data?.status?.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onRequestChange = async () => {
    try {
      setLoading(true);
      let payload = {
        message: changes.comment,
        invite_id: deal?.invite?.id,
      };

      let { status, data } = await addCommentOnDeal(
        Number(deal?.id),
        authToken,
        payload
      );
      if (status === 200) {
        toast.success(language?.v3?.common?.suces_msg, toastUtil);
        setModalOpen(false);
      }
    } catch (error) {
    } finally {
      onGetdeal();
      setLoading(false);
      setChanges({ comment: '', action: '', document: null });
    }
  };

  const onAddCommentOnDeal = async () => {
    try {
      setLoading(true);
      let payload = {
        message: changes.comment,
        invite_id: deal?.invite?.id,
        thread_id: deal?.comments[0]?.id,
      };
      let { status, data } = await addCommentOnDeal(
        Number(deal?.id),
        authToken,
        payload
      );
      if (status === 200) {
        toast.success(language?.v3?.common?.suces_msg, toastUtil);
        setModalOpen(false);
      }
    } catch (error) {
    } finally {
      onGetdeal();
      setLoading(false);
      setChanges({ comment: '', action: '', document: null });
    }
  };
  function getTermDisplayName(term: any) {
    const termDisplayNames: any = {
      'MFN Only': language?.v3?.fundraiser?.mfn_only,
      'Pro Rata': language?.v3?.fundraiser?.pro_rata,
      Discount: language?.v3?.fundraiser?.discount,
      'Minimum Check Size': language?.v3?.fundraiser?.min_check_size,
      'Additional Terms': language?.v3?.fundraiser?.additional_terms,
      'Valuation Cap': language?.v3?.fundraiser?.valuation_cap,
    };

    return termDisplayNames[term] || term;
  }

  function getTermValue(term: any) {
    if (term.is_enabled) {
      if (term.term === language?.v3?.fundraiser?.discount) {
        return `${term.value}%` || language?.v3?.fundraiser?.yes;
      } else if (
        term.term === language?.v3?.fundraiser?.min_check_size ||
        term.term === language?.v3?.fundraiser?.valuation_cap
      ) {
        return term.value && event === 'ar'
          ? comaFormattedNumber(term.value, DealCheckType.STARTUP, true)
          : comaFormattedNumber(term.value, DealCheckType.STARTUP) ||
              language?.v3?.fundraiser?.yes;
      } else if (term.term === language?.v3?.fundraiser?.additional_terms) {
        return term.value;
      } else {
        return language?.v3?.fundraiser?.yes;
      }
    } else {
      return language?.v3?.fundraiser?.no;
    }
  }
  const getRoleBasedUI = () => {
    return (
      <React.Fragment>
        {deal?.equity_type && (
          <>
            {deal?.instrument_type && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.deal?.instrument_type}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {deal?.instrument_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {deal?.instrument_type && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.deal?.equity_type}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {deal?.equity_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {deal?.stage && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.table?.stage}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {deal?.stage || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {deal?.selling_price && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.fundraiser?.deal_target}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {event === 'ar'
                    ? comaFormattedNumber(
                        deal?.selling_price,
                        DealCheckType.STARTUP,
                        true
                      )
                    : comaFormattedNumber(
                        deal?.selling_price,
                        DealCheckType.STARTUP
                      ) || language?.v3?.common?.not_added}
                </p>
              </div>
            )}
            {deal?.valuation && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.table?.valuation}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {event === 'ar'
                    ? comaFormattedNumber(
                        deal?.valuation,
                        DealCheckType.STARTUP,
                        true
                      )
                    : comaFormattedNumber(
                        deal?.valuation,
                        DealCheckType.STARTUP
                      )}
                </p>
              </div>
            )}

            {deal?.terms && (
              <div className='w-full'>
                {deal.terms.map((term: any, index: any) => (
                  <div
                    key={index}
                    className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'
                  >
                    <h3 className='text-neutral-900 font-medium text-sm'>
                      {getTermDisplayName(term.term)}
                    </h3>
                    <p className='text-neutral-900 font-normal text-sm capitalize'>
                      {getTermValue(term)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {deal?.safe_type && (
          <>
            {deal?.instrument_type && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.deal?.instrument_type}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {deal?.instrument_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}

            {deal?.safe_type && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.fundraiser?.safe_type}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {deal?.safe_type || language?.v3?.common?.not_added}
                </p>
              </div>
            )}

            {deal?.selling_price && (
              <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
                <h3 className='text-neutral-900 font-medium text-sm'>
                  {language?.v3?.table?.target}
                </h3>
                <p className='text-neutral-900 font-normal text-sm capitalize'>
                  {event === 'ar'
                    ? comaFormattedNumber(
                        deal?.selling_price,
                        DealCheckType.STARTUP,
                        true
                      )
                    : comaFormattedNumber(
                        deal?.selling_price,
                        DealCheckType.STARTUP
                      ) || language?.v3?.common?.not_added}
                </p>
              </div>
            )}

            {deal?.terms && (
              <div className='w-full'>
                {deal.terms.map((term: any, index: any) => (
                  <div
                    key={index}
                    className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'
                  >
                    <h3 className='text-neutral-900 font-medium text-sm'>
                      {getTermDisplayName(term.term)}
                    </h3>
                    <p className='text-neutral-900 font-normal text-sm capitalize'>
                      {getTermValue(term)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!deal?.equity_type && !deal?.safe_type && deal?.selling_price && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.table?.sellingPrice}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {event === 'ar'
                ? comaFormattedNumber(
                    deal?.selling_price,
                    DealCheckType.STARTUP,
                    true
                  )
                : comaFormattedNumber(
                    deal?.selling_price,
                    DealCheckType.STARTUP
                  ) || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.status && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.table?.status}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.status || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.start_at && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.start_at}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.start_at || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.end_at && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.end_at}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.end_at || language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.committed > 0 && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.committed}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {event === 'ar'
                ? comaFormattedNumber(
                    deal?.committed,
                    DealCheckType.STARTUP,
                    true
                  )
                : comaFormattedNumber(deal?.committed, DealCheckType.STARTUP)}
            </p>
          </div>
        )}
        {deal?.location && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.location}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.location}
            </p>
          </div>
        )}
        {deal?.raised > 0 && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.raised}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {event === 'ar'
                ? comaFormattedNumber(
                    deal?.raised,
                    DealCheckType.STARTUP,
                    true
                  )
                : comaFormattedNumber(deal?.raised, DealCheckType.PROPERTY)}
            </p>
          </div>
        )}
        {deal?.size && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.table?.size}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {comaFormattedNumber(deal?.size)} {language?.v3?.common?.sqft}
            </p>
          </div>
        )}
        {deal?.expected_annual_return && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.expected_annual_return}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.expected_annual_return + '%' ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.expected_dividend_yield && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.expected_dividend_yield}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.expected_dividend_yield + '%' ||
                language?.v3?.common?.not_added}
            </p>
          </div>
        )}
        {deal?.features?.bedrooms && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.beds}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.features?.bedrooms}
            </p>
          </div>
        )}
        {deal?.features?.kitchen && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.kitchen}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.features?.kitchen}
            </p>
          </div>
        )}
        {deal?.features?.washroom && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.washroom}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.features?.washroom}
            </p>
          </div>
        )}
        {deal?.features?.parking && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.parking}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.features?.parking}
            </p>
          </div>
        )}
        {deal?.features?.swimming_pool && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.swim}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {deal?.features?.swimming_pool}
            </p>
          </div>
        )}
        {deal?.features?.rental_amount && (
          <div className='w-full inline-flex justify-between items-center border-b-[1px] border-b-neutral-200 py-3'>
            <h3 className='text-neutral-900 font-medium text-sm'>
              {language?.v3?.deal?.por_2}
            </h3>
            <p className='text-neutral-900 font-normal text-sm capitalize'>
              {event === 'ar'
                ? comaFormattedNumber(
                    deal?.rental_amount,
                    DealCheckType.PROPERTY,
                    true
                  )
                : comaFormattedNumber(
                    deal?.rental_amount,
                    DealCheckType.PROPERTY
                  )}
              ({deal?.features?.rental_period})
            </p>
          </div>
        )}
      </React.Fragment>
    );
  };

  const syndicateInvestment = async () => {
    try {
      setLoading(true);
      const { status } = await investSyndicate(
        dealDetail?.id,
        {
          investment: {
            amount: investmentAmount,
          },
        },
        authToken
      );
      if (status === 200) {
        setInvestButtonDisable(false);
        toast.success(language?.v3?.syndicate?.invested, toastUtil);
      }
    } catch (error: any) {
      toast.warning(error?.response?.data?.status?.message, toastUtil);
    } finally {
      setLoading(false);
      setInvestButtonDisable(false);
      onGetdeal();
    }
  };

  const postSignOff = async () => {
    try {
      let allFiles = files.map((file: any) => file.file);
      const formData = new FormData();
      formData.append('invite[status]', 'accepted');
      for (let i = 0; i < allFiles.length; i++) {
        const element = allFiles[i];
        formData.append(
          `invite[deal_attachments][${i}]file`,
          element,
          element?.name
        );
        formData.append(
          `invite[deal_attachments][${i}]attachment_kind`,
          element?.type.includes('image') ? 'image' : 'pdf'
        );
        formData.append(`invite[deal_attachments][${i}]name`, element?.name);
      }
      let { status } = await syndicateApprove(
        formData,
        deal?.id,
        deal?.invite?.id,
        authToken
      );
      if (status === 200) {
        toast.success(
          language?.v3?.syndicate?.congrats_deal_approval,
          toastUtil
        );
        setModalOpen3(false);
      }
    } catch (error) {
    } finally {
      onGetdeal();
      setLoading(false);
      setChanges({ comment: '', action: '', document: null });
    }
  };

  const syndicationRequest = async () => {
    try {
      let allFiles = files.map((file: any) => file.file);
      const formData = new FormData();
      formData.append('invite[status]', 'accepted');
      for (let i = 0; i < allFiles.length; i++) {
        const element = allFiles[i];
        formData.append(
          `invite[deal_attachments][${i}]file`,
          element,
          element?.name
        );
        formData.append(
          `invite[deal_attachments][${i}]attachment_kind`,
          element?.type.includes('image') ? 'image' : 'pdf'
        );
        formData.append(`invite[deal_attachments][${i}]name`, element?.name);
      }
      let { status, data } = await requestSyndication(
        formData,
        deal?.id,
        authToken
      );
      if (status === 200) {
        toast.success(language?.v3?.syndicate?.congrats_requested, toastUtil);
      }
    } catch (error) {
    } finally {
      onGetdeal();
      setLoading(false);
      setModalOpen3(false);
      setChanges({ comment: '', action: '', document: null });
    }
  };

  return (
    <main className='h-full relative max-h-full overflow-y-hidden'>
      <section>
        <Header
          onSuperLogout={(e: boolean) => {
            setLoading(e);
          }}
        />
      </section>
      <aside
        className='w-full flex items-start justify-start'
        style={{ height: 'calc(100% - 70px)' }}
      >
        {user.type.toLowerCase() === 'investor' ? (
          <Sidebar type={KanzRoles.INVESTOR} />
        ) : (
          <Sidebar type={KanzRoles.SYNDICATE} />
        )}

        {loading ? (
          <div
            className='absolute left-0 top-0 w-full h-full grid place-items-center'
            style={{ backgroundColor: 'rgba(255, 255, 255, 1)', zIndex: 50 }}
          >
            <Spinner />
          </div>
        ) : (
          <section
            className='bg-cbc-auth h-full pt-[5rem] px-[5rem] flex items-start overflow-y-auto'
            style={{ width: 'calc(100% - 250px)' }}
          >
            {/* Section Left */}
            <section className='w-[60%] relative'>
              <div
                className='w-full inline-flex pb-4 items-center gap-2 relative top-[-25px] cursor-pointer border-b-[1px] border-b-neutral-200'
                onClick={() =>
                  user.type === 'Investor'
                    ? navigate(RoutesEnums.INVESTOR_DEALS)
                    : navigate(returnPath)
                }
              >
                <Chevrond
                  className={`${
                    orientation === 'rtl' ? 'rotate-[-90deg]' : 'rotate-[90deg]'
                  } w-4 h-4`}
                  strokeWidth={2}
                  stroke={'#000'}
                />
                <small className='text-neutral-500 text-sm font-medium'>
                  {returnPath === RoutesEnums.INVESTOR_DEALS &&
                    language?.v3?.syndicate?.dealsSidebar}
                  {returnPath === RoutesEnums.SYNDICATE_DASHBOARD &&
                    language?.v3?.syndicate?.dashboard}
                  {returnPath === RoutesEnums.SYNDICATE_INVESTMENTS &&
                    language?.v3?.syndicate?.investments}
                  {returnPath === RoutesEnums.DEAL_APPROVAL &&
                    language?.v3?.syndicate?.deal_approval}
                </small>
              </div>
              <div className='w-full inline-flex flex-col pb-8 items-start gap-2'>
                <h1 className='text-black font-medium text-xl'>
                  {deal?.title}
                </h1>
                <p className='text-sm text-neutral-500 font-medium'>
                  {deal?.description}
                </p>
              </div>
              <div
                className='inline-flex justify-between w-full mb-4'
                onClick={() => {
                  window.open(pitchDeck?.attributes?.url, '_blank');
                }}
              >
                <h1 className='text-black font-medium text-2xl'>
                  {language?.v3?.syndicate?.investor_pitch}
                </h1>
                <Button type='outlined'>{language?.v3?.button?.new_tab}</Button>
              </div>
              {/* If Image or PDF */}
              {pitchDeck?.attributes?.attachment_kind === FileType.IMAGE ? (
                <section className='h-[700px] rounded-[8px] overflow-hidden border-[1px] border-neutral-200 relative'>
                  <aside
                    className='w-full overflow-y-auto bg-cbc-grey-sec p-4'
                    style={{ height: '100%' }}
                  >
                    {fileLoading ? (
                      <div
                        className='absolute left-0 top-0 w-full h-full grid place-items-center'
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                          zIndex: 50,
                        }}
                      >
                        <Spinner />
                      </div>
                    ) : (
                      <img
                        src={pitchDeck?.attributes?.url}
                        alt={pitchDeck?.attributes?.name}
                        id='deal-file'
                        className='bg-white mx-auto'
                        style={{ maxWidth: 'unset', objectFit: 'contain' }}
                      />
                    )}
                  </aside>
                </section>
              ) : (
                <section className='w-full h-[700px] rounded-[8px] overflow-hidden border-[1px] border-neutral-200 bg-cbc-grey-sec p-4 relative'>
                  {fileLoading ? (
                    <div
                      className='absolute left-0 top-0 w-full h-full grid place-items-center'
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        zIndex: 50,
                      }}
                    >
                      <Spinner />
                    </div>
                  ) : (
                    <embed
                      src={pitchDeck?.attributes?.url}
                      className='w-full h-full'
                      id='deal-file'
                    />
                  )}
                </section>
              )}

              {/*               {convertStatusLanguage(deal?.status) === DealStatus.LIVE &&
                !deal?.is_invested && (
                  <>
                    <section className="mb-4 mt-10">
                      <div className="border-neutral-500 border-[1px] rounded-md min-w-full px-2 justify-between flex bg-white">
                        <label className="w-full">
                          <input
                            className="min-w-full h-9 no-spin-button"
                            pattern="[0-9]*"
                            placeholder={
                              selectedCurrency === "USD"
                                ? language?.v3?.investor?.placeholderUSD
                                : language?.v3?.investor?.placeholderAED
                            }
                            onKeyDown={(evt) =>
                              ["e", "E", "+", "-"].includes(evt.key) &&
                              evt.preventDefault()
                            }
                            min="0"
                            type="number"
                            value={investmentAmount}
                            onChange={handleAmountChange}
                          />
                        </label>

                      </div>
                      <div className="mt-3">
                        <Button
                          disabled={
                            investmentAmount === undefined ||
                            investmentAmount < 1 ||
                            InvestButtonDisable
                          }
                          onClick={() => {
                            setInvestButtonDisable(true);
                            syndicateInvestment();
                          }}
                          className="w-full"
                        >
                          {language?.v3?.syndicate?.invest_now}
                        </Button>
                      </div>
                    </section>
                  </>
                )} */}
              <section>
                <div className='inline-flex justify-between w-full flex-col my-10'>
                  <h1 className='text-black font-medium text-2xl mb-3'>
                    {language?.v3?.common?.risk_disc}
                  </h1>
                  <p
                    className='font-medium'
                    /* dangerouslySetInnerHTML={{ __html: deal?.terms }} */
                  >
                    {language?.v3?.dealOverview?.heading1}
                  </p>
                  <ul className=' list-disc pl-6 text-sm'>
                    <li>{' ' + language?.v3?.dealOverview?.h1bullet1}</li>
                    <li>{' ' + language?.v3?.dealOverview?.h1bullet2}</li>
                    <li>{' ' + language?.v3?.dealOverview?.h1bullet3}</li>
                  </ul>
                  <p
                    className='font-medium'
                    /* dangerouslySetInnerHTML={{ __html: deal?.terms }} */
                  >
                    {language?.v3?.dealOverview?.heading2}
                  </p>
                  <ul className=' list-disc pl-6 text-sm'>
                    <li>{' ' + language?.v3?.dealOverview?.h2bullet1}</li>
                    <li>{' ' + language?.v3?.dealOverview?.h2bullet2}</li>
                    <li>{' ' + language?.v3?.dealOverview?.h1bullet3}</li>
                  </ul>
                  <p
                    className='font-medium'
                    /* dangerouslySetInnerHTML={{ __html: deal?.terms }} */
                  >
                    {language?.v3?.dealOverview?.heading3}
                  </p>
                  <ul className=' list-disc pl-6 text-sm'>
                    <li>{' ' + language?.v3?.dealOverview?.h3bullet1}</li>
                    <li>{' ' + language?.v3?.dealOverview?.h3bullet2}</li>
                    <li>{' ' + language?.v3?.dealOverview?.h3bullet3}</li>
                  </ul>
                </div>
              </section>
              <div className='mb-4 mt-10'>
                {user.type.toLowerCase() === 'syndicate' &&
                  convertStatusLanguage(deal?.status) !== DealStatus.LIVE && (
                    <div className='w-full inline-flex justify-end gap-4'>
                      {convertStatusLanguage(deal?.invite?.status) !==
                        DealStatus.ACCEPTED && (
                        <div className='w-full'>
                          {deal?.invite ? (
                            <Button
                              className='w-full'
                              onClick={() => setModalOpen2(true)}
                            >
                              {language?.v3?.button?.interested}
                            </Button>
                          ) : (
                            <Button
                              className='w-full'
                              onClick={() => setModalOpenSyndication(true)}
                            >
                              {language?.v3?.syndicate?.req_syndication}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
              </div>

              {deal &&
                user.type.toLowerCase() === 'syndicate' &&
                deal?.current_deal_syndicate && (
                  <div className='w-full mt-8 mb-4'>
                    <Investors dealID={deal?.id} dealCreatorView={false} />
                  </div>
                )}
            </section>

            {/* Invisible Section */}
            <section className='w-[10%]'></section>
            <section className='w-[30%]'>
              {/* Show/Hide based on some conditions */}
              {user.type.toLowerCase() === 'syndicate' &&
                convertStatusLanguage(deal?.status) === DealStatus.LIVE &&
                deal?.current_deal_syndicate && (
                  <div className='w-full inline-flex justify-end gap-4'>
                    <div className='relative z-10'>
                      <InvitesListing
                        approve={deal?.status}
                        dealId={dealToken}
                        type={KanzRoles.SYNDICATE}
                        dealIdReal={deal?.id}
                      />
                    </div>
                  </div>
                )}
              {user.type.toLowerCase() === 'syndicate' &&
                convertStatusLanguage(deal?.status) !== DealStatus.LIVE && (
                  <div className='w-full inline-flex justify-end gap-4'>
                    {convertStatusLanguage(deal?.invite?.status) !==
                      DealStatus.ACCEPTED && (
                      <React.Fragment>
                        {deal?.invite ? (
                          <>
                            <Button
                              type='outlined'
                              onClick={() => setModalOpen(true)}
                            >
                              {language?.v3?.button?.req_change}
                            </Button>
                            <Button onClick={() => setModalOpen2(true)}>
                              {language?.v3?.button?.interested}
                            </Button>
                          </>
                        ) : (
                          <Button onClick={() => setModalOpenSyndication(true)}>
                            {language?.v3?.syndicate?.req_syndication}
                          </Button>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                )}
              <aside className='border-[1px] border-neutral-200 rounded-md w-full px-3 pt-3 mt-5 bg-white'>
                <span className='w-full flex flex-col'>
                  <span className='w-full flex'>
                    <h2 className='text-neutral-700 text-xl font-medium flex-nowrap w-full'>
                      {language?.v3?.common?.invest_details}
                    </h2>
                    {!(
                      investmentAmount === undefined ||
                      investmentAmount < 1 ||
                      InvestButtonDisable
                    ) && (
                      <span
                        onClick={() => {
                          setModalOpenConversion(true);
                        }}
                        className='w-[60%] text-[#155E75] text-xs flex items-center justify-end hover:underline cursor-pointer'
                      >
                        View conversion rate
                      </span>
                    )}
                  </span>
                  <small className='text-neutral-500 text-sm font-normal'>
                    {language?.v3?.common?.end_on} {deal?.end_at}
                  </small>
                </span>

                {convertStatusLanguage(deal?.status) === DealStatus.LIVE &&
                  !deal?.is_invested && (
                    <aside className=''>
                      <section className='mb-4 mt-1'>
                        <div className='border-neutral-500 border-[1px] rounded-md min-w-full bg-white px-2 justify-between flex'>
                          <label className='w-full'>
                            <input
                              className='min-w-full h-9 no-spin-button'
                              pattern='[0-9]*'
                              placeholder={
                                selectedCurrency === 'USD'
                                  ? language?.v3?.investor?.placeholderUSD
                                  : language?.v3?.investor?.placeholderAED
                              }
                              onKeyDown={(evt) =>
                                ['e', 'E', '+', '-'].includes(evt.key) &&
                                evt.preventDefault()
                              }
                              min='0'
                              type='number'
                              value={investmentAmount}
                              onChange={handleAmountChange}
                            />
                          </label>
                        </div>
                        <Button
                          disabled={
                            investmentAmount === undefined ||
                            investmentAmount < 1 ||
                            InvestButtonDisable
                          }
                          onClick={() => {
                            setInvestButtonDisable(true);
                            syndicateInvestment();
                          }}
                          className='w-full mt-4'
                        >
                          {language?.v3?.syndicate?.invest_now}
                        </Button>
                      </section>
                    </aside>
                  )}

                {getRoleBasedUI()}
              </aside>
              {deal?.is_invested && (
                <div className=''>
                  <aside className='border-[1px] bg-white border-neutral-200 rounded-md  w-full p-3 mt-5 items-center gap-3'>
                    <div className='rounded-md text-md font-semibold inline-grid place-items-center'>
                      {language?.v3?.syndicate?.your_commitment}
                    </div>
                    <div className='rounded-md text-xs inline-grid place-items-center'>
                      {language?.v3?.syndicate?.not_able_to_rev}
                    </div>
                    <aside className='border-t-[2px] border-neutral-200 w-full p-3 mt-5 inline-flex items-center gap-3'>
                      <div className='h-8 w-8 rounded-md bg-cbc-grey-sec inline-grid place-items-center'>
                        <img src={CurrencySVG} alt='Currency' />
                      </div>
                      <div className='flex items-center justify-between w-full'>
                        <div>
                          <h2 className='text-neutral-900 font-normal text-sm'>
                            {language?.v3?.syndicate?.commitment}
                          </h2>
                          <p className='text-black font-medium text-lg'>
                            ${comaFormattedNumber(deal?.my_invested_amount)}
                          </p>
                        </div>
                        {deal?.is_refundable && (
                          <div>
                            <Button
                              onClick={() => {
                                revertInvestment({
                                  dealId: deal?.id,
                                  authToken: authToken,
                                  getDealDetail: onGetdeal,
                                  setLoading: setLoading,
                                });
                              }}
                              className='!py-1 !px-2 !font-medium !rounded-full border-[1px] border-black !text-xs'
                              type='outlined'
                            >
                              {language?.v3?.syndicate?.reverse}
                            </Button>
                          </div>
                        )}
                      </div>
                    </aside>
                  </aside>
                </div>
              )}
              <aside className='border-[1px] border-neutral-200 rounded-md w-full p-3 mt-5 inline-flex bg-white items-center gap-3 bg-white'>
                <div className='h-8 w-8 rounded-md bg-cbc-grey-sec inline-grid place-items-center'>
                  <img src={CurrencySVG} alt='Currency' />
                </div>

                <div>
                  <h2 className='text-neutral-900 font-normal text-sm'>
                    {language?.v3?.common?.am_raised}
                  </h2>
                  <p className='text-black font-medium text-lg'>
                    ${comaFormattedNumber(deal?.raised)}
                  </p>
                </div>
              </aside>
              {deal?.docs?.length && (
                <aside className='border-[1px] border-neutral-200 overflow-auto custom-scroll rounded-md w-full p-3 mt-5 bg-cbc-check max-h-[400px] overflow-y-auto no-scrollbar mb-4'>
                  {React.Children.toArray(
                    deal?.docs?.map((doc: any) => {
                      return (
                        <section className='rounded-md bg-white px-3 py-1 inline-flex items-center justify-between w-full border-[1px] border-neutral-200 mb-2'>
                          <span className='inline-flex items-center w-[80%]'>
                            <div
                              onClick={() => {
                                window.open(doc?.url, '_blank');
                              }}
                              className='bg-white  h-14 inline-flex justify-center flex-col  cursor-pointer w-full'
                            >
                              <h4
                                className='text-md font-medium  max-w-full truncate'
                                title={doc?.name}
                              >
                                {doc?.name}
                              </h4>
                              <h2 className='inline-flex items-center text-sm  gap-1 max-w-[200px] '>
                                <div className='text-xs text-black text-neutral-500 font-medium '>
                                  {language?.v3?.button?.view}
                                </div>
                                <ArrowIcon stroke='#000' />
                              </h2>
                            </div>
                          </span>

                          <div
                            className='h-10 w-10 rounded-lg inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer border-[1px] border-neutral-200'
                            onClick={() => {
                              onDownloadDocument(doc?.id, authToken);
                            }}
                          >
                            <DownloadIcon />
                          </div>
                        </section>
                      );
                    })
                  )}
                </aside>
              )}
              {deal?.status === CLOSED && (
                <Button
                  onClick={() => {
                    setUpdateModal(true);
                  }}
                  className='w-full mt-2'
                >
                  {language?.v3?.button?.update}
                </Button>
              )}

              <aside>
                {deal?.comments?.length && (
                  <div className='justify-between mb-4 w-full border-[1px]  rounded-md border-b-neutral-200 bg-white '>
                    <div className='inline-flex justify-between items-center w-full  border-b-[1px] border-b-neutral-200 '>
                      <div className='pb-1 m-4  text-lg font-bold '>
                        {language?.v3?.syndicate?.comments}
                      </div>
                      <Button
                        className='mr-4 ml-4'
                        onClick={() => setmodalOpenComment(true)}
                        type='outlined'
                      >
                        {language?.v3?.syndicate?.add_reply}
                      </Button>
                    </div>
                    <p className=' overflow-auto custom-scroll rounded-md  w-full opacity-80 max-h-56 text-neutral-700 font-normal text-sm text-justify'>
                      {React.Children.toArray(
                        deal?.comments?.map((comments: any) => (
                          <div className=' p-2 pt-3 border-b-[1px] border-neutral-300 overflow-hidden  font-medium  w-full items-center justify-between'>
                            <div className=' pl-2 inline-flex items-start'>
                              <img
                                className='h-7 w-7 rounded-full'
                                src={
                                  'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
                                }
                                alt='Author Logo'
                              />
                              <span className='ml-2 mr-4'>
                                <h1 className='font-medium capitalize text-lg'>
                                  {comments?.author_id === user?.id
                                    ? language?.v3?.syndicate?.you
                                    : comments?.author_name}
                                  <span className='text-xs font-neutral-700 ml-5 font-normal'>
                                    {event === 'ar'
                                      ? timeAgo(comments?.created_at, true)
                                      : timeAgo(comments?.created_at)}
                                  </span>
                                </h1>
                                <p className='pt-0 pb-1 overflow-y-auto custom-scroll font-nromal text-sm text-neutral-700'>
                                  {comments?.message}
                                </p>
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </p>
                  </div>
                )}
              </aside>
            </section>
          </section>
        )}
      </aside>

      <Modal show={modalOpenComment ? true : false} className='w-full'>
        <div
          className='rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.078' }}
        >
          <aside className='bg-white w-[400px] rounded-md h-full'>
            <section className='py-3 px-4'>
              <header className='h-16 py-2 px-3 inline-flex w-full justify-between items-center'>
                <h3 className='text-xl font-medium text-neutral-700'>
                  {language?.v3?.syndicate?.reply}
                </h3>
                <div
                  className='bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer'
                  onClick={() => {
                    setmodalOpenComment(false);
                    setChanges({ comment: '', action: '', document: null });
                    // setFiles([]);
                  }}
                >
                  <CrossIcon stroke='#000' />
                </div>
              </header>
              <div className='mb-6'>
                <textarea
                  value={changes?.comment}
                  onChange={(e) =>
                    setChanges((prev: any) => {
                      return { ...prev, comment: e.target.value };
                    })
                  }
                  placeholder={language?.v3?.syndicate?.add_reply}
                  className=' h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline'
                ></textarea>
              </div>
            </section>

            <footer className='w-full inline-flex justify-between gap-3 py-2 px-3 w-full'>
              <Button
                disabled={!changes.comment}
                className='w-full !py-1'
                divStyle='flex items-center justify-center w-full'
                onClick={() => {
                  onAddCommentOnDeal();
                  setmodalOpenComment(false);
                }}
              >
                {language?.v3?.syndicate?.reply}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>

      <Modal show={modalOpen ? true : false} className='w-full'>
        <div
          className='rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.078' }}
        >
          <aside className='bg-white w-[400px] rounded-md h-full'>
            <header className='bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center'>
              <h3 className='text-xl font-medium text-neutral-700'>
                {language?.v3?.syndicate?.req_changes}
              </h3>
              <div
                className='bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer'
                onClick={() => {
                  setModalOpen(false);
                  setChanges({ comment: '', action: '', document: null });
                  // setFiles([]);
                }}
              >
                <CrossIcon stroke='#000' />
              </div>
            </header>

            <section className='py-3 px-4'>
              <div className='mb-6'>
                <label
                  htmlFor=''
                  className='text-neutral-900 font-medium text-sm'
                >
                  {language?.v3?.syndicate?.add_comment}
                </label>
                <textarea
                  value={changes?.comment}
                  onChange={(e) =>
                    setChanges((prev: any) => {
                      return { ...prev, comment: e.target.value };
                    })
                  }
                  placeholder={language?.v3?.syndicate?.add_comment}
                  className=' h-[100px] mt-1 shadow-sm appearance-none border border-neutral-300 rounded-md w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline'
                ></textarea>
              </div>
            </section>

            <footer className='w-full inline-flex justify-between gap-3 py-2 px-3 w-full'>
              <Button
                disabled={!changes.comment}
                className='w-full !py-1'
                divStyle='flex items-center justify-center w-full'
                onClick={() => {
                  setModalOpen(false);
                  onRequestChange();
                }}
              >
                {language.buttons.submit}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpen2 ? true : false} className='w-full'>
        <div
          className='rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.078' }}
        >
          <aside className='bg-white w-[400px] rounded-md h-full'>
            <header className=' inline-flex w-full justify-end items-center py-1 px-2'>
              <div
                className='bg-white h-8 w-8 border-[1px] border-black rounded-md shadow  cursor-pointer'
                onClick={() => {
                  setModalOpen2(false);
                  setChanges({ comment: '', action: '', document: null });
                  // setFiles([]);
                }}
              >
                <CrossIcon stroke='#000' />
              </div>
            </header>
            <section className='py-2 px-10'>
              <div className='mb-6  text-center'>
                <label
                  htmlFor=''
                  className='text-neutral-900 text-center font-bold text-xl'
                >
                  {language?.v3?.syndicate?.deal_approved_by_you}
                </label>
                <p className='pt-5'>
                  {language?.v3?.syndicate?.deal_approved_para}
                </p>
              </div>
            </section>

            <footer className='w-full inline-flex justify-center gap-3 py-2 px-3 w-full'>
              <Button
                className='w-full !py-1'
                divStyle='flex items-center justify-center w-6/12'
                onClick={() => {
                  setModalOpen2(false);
                  setModalOpen3(true);
                }}
              >
                {language?.v3?.syndicate?.continue}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpenSyndication ? true : false} className='w-full'>
        <div
          className='rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.078' }}
        >
          <aside className='bg-white w-[400px] rounded-md h-full pb-5'>
            <section className='py-3 px-10'>
              <header className='h-16 inline-flex w-full justify-between items-center'>
                <div
                  className='bg-white h-8 w-8 p-1 cursor-pointer'
                  onClick={() => {
                    setModalOpenSyndication(false);
                  }}
                >
                  <CrossIcon stroke='#000' />
                </div>
              </header>
              <div className='mb-6 pt-5 text-center'>
                <label
                  htmlFor=''
                  className='text-neutral-900 text-center font-bold text-xl'
                >
                  {language?.v3?.syndicate?.req_for_syndication}
                </label>
                <p className='pt-5'>
                  {language?.v3?.syndicate?.req_changes_para}
                </p>
              </div>
            </section>

            <footer className='w-full inline-flex justify-center gap-3 py-2 px-3 w-full'>
              <Button
                className='w-full !py-1'
                divStyle='flex items-center justify-center w-6/12'
                onClick={() => {
                  setModalOpenSyndication(false);
                  setModalOpen3(true);
                }}
              >
                {language?.v3?.syndicate?.continue}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>
      <Modal show={modalOpen3 ? true : false} className='w-full'>
        <div
          className='rounded-md overflow-hidden inline-grid place-items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.078' }}
        >
          <aside className='bg-white w-[400px] rounded-md h-full'>
            <header className='bg-cbc-grey-sec h-16 py-2 px-3 inline-flex w-full justify-between items-center'>
              <h3 className='text-xl font-medium text-neutral-700'>
                {language?.v3?.syndicate?.deal_approval}
              </h3>
              <div
                className='bg-white h-8 w-8 border-[1px] border-black rounded-md shadow shadow-cs-6 p-1 cursor-pointer'
                onClick={() => {
                  setModalOpen3(false);
                  setChanges({ comment: '', action: '', document: null });
                  // setFiles([]);
                }}
              >
                <CrossIcon stroke='#000' />
              </div>
            </header>

            <section className='py-3 px-4'>
              <div className='mb-3 w-full'>
                <span className='w-full'>
                  <button
                    className='bg-cbc-grey-sec rounded-lg inline-flex justify-center gap-2 px-4 py-2 w-full'
                    onClick={() => {
                      let elem: any =
                        document.getElementById('doc_deal_uploader');
                      elem.click();
                    }}
                  >
                    <UploadIcon />
                    <small className='text-cyan-800 text-sm font-medium'>
                      {language?.v3?.syndicate?.upload_a_doc}
                    </small>
                  </button>
                  <input
                    type='file'
                    className='hidden'
                    id='doc_deal_uploader'
                    multiple={true}
                    onChange={handleFileUpload}
                  />
                </span>
                <span className={`px-2 text-[0.55rem] font-light`}>
                  {language?.v3?.syndicate?.upload_size}
                </span>
              </div>
              <div className='mb-3 w-full'>
                {React.Children.toArray(
                  files?.map((doc: any) => {
                    return (
                      <section className='rounded-md bg-cbc-grey-sec px-1 py-2 inline-flex items-center justify-between border-[1px] border-neutral-200 w-full'>
                        <span className='inline-flex items-center'>
                          <div className='rounded-[7px] bg-white shadow shadow-cs-3 w-14 h-14 inline-grid place-items-center'>
                            <img src={FileSVG} alt='File' />
                          </div>
                          <span className='inline-flex flex-col items-start ml-3'>
                            <h2
                              className='text-sm font-medium text-neutral-900 max-w-[150px] truncate'
                              title={doc?.file?.name}
                            >
                              {doc?.file?.name}
                            </h2>
                          </span>
                        </span>

                        <small>{doc?.size} MB</small>
                        <div
                          className='rounded-lg w-8 h-8 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer'
                          onClick={() => {
                            setFiles((pr: any) => {
                              let files = pr.filter(
                                (p: any) => p.id !== doc.id
                              );
                              return files;
                            });
                          }}
                        >
                          <BinIcon stroke='#404040' />
                        </div>
                      </section>
                    );
                  })
                )}
              </div>
            </section>

            <footer className='inline-flex justify-between gap-3 py-2 px-3 w-full'>
              <Button
                disabled={disableUpload}
                className='w-full !py-1'
                divStyle='flex items-center justify-center w-full'
                onClick={() => {
                  setdisableUpload(true);
                  invited ? postSignOff() : syndicationRequest();
                }}
              >
                {language.buttons.submit}
              </Button>
            </footer>
          </aside>
        </div>
      </Modal>

      <Modal show={modalOpenConversion} className='w-full'>
        <CurrencyConversionModal
          setOpen={setModalOpenConversion}
          amount={investmentAmount}
        />
      </Modal>

      <Modal show={updateModal}>
        <UpdateModal setOpen={setUpdateModal} id={deal?.id || ''} />
      </Modal>
    </main>
  );
};
export default StartupCase;
