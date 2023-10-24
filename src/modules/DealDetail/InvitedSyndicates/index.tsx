import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../shared/components/Table";
import { RootState } from "../../../redux-toolkit/store/store";
import { ApplicationStatus } from "../../../enums/types.enum";
import { saveDataHolder } from "../../../redux-toolkit/slicer/dataHolder.slicer";
import { getDealSyndicates } from "../../../apis/deal.api";
import { numberFormatter } from "../../../utils/object.utils";
import Button from "../../../shared/components/Button";
import { saveToken } from "../../../redux-toolkit/slicer/auth.slicer";
import { RoutesEnums } from "../../../enums/routes.enum";

const InvitedSyndicates = ({id }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const language: any = useSelector((state: RootState) => state.language.value);
    const authToken: any = useSelector((state: RootState) => state.auth.value);
    const columns = [language?.v3?.syndicate?.table?.title, language?.v3?.syndicate?.table?.dealflow, language?.v3?.syndicate?.table?.raising_ventures, language?.v3?.syndicate?.table?.action];
    const [loading, setLoading]: any = useState(false);
    const [invites, setInvites]: any = useState([]);
    const [pagination, setPagination] = useState({ items_per_page: 5, total_items: [], current_page: 1, total_pages: 0 });

    useEffect(() => {
        dispatch(saveDataHolder(""));
        getAllDeals();
    }, []);

    const getAllDeals = async () => {
        try {
            setLoading(true);
            let { status, data } = await getDealSyndicates(id, authToken);
            if (status === 200) {
                let deals = data?.status?.data?.map((deal: any) => {
                    return {
                        id: deal?.id,
                        [language?.v3?.table?.title]: <div><img src='/' alt='none'>{deal?.title}</img></div>,
                        [language?.v3?.table?.target]: `$${numberFormatter(Number(deal?.target))}`,
                        [language?.v3?.table?.stage]: deal?.title || "N/A",
                        [language?.v3?.table?.round]: deal?.round,
                        [language?.v3?.table?.status]: deal?.status,
                        [language?.v3?.table?.type]: deal?.instrument_type,
                        Stage: deal?.current_stage,
                        Action: <Button divStyle='items-center justify-end' type='outlined' className='!p-3 !py-1 !rounded-full' onClick={() => {
                            
                        }}>{'M'}</Button>

                    }
                });

               
                setPagination(prev => {
                    return { ...prev, total_items: deals.length, current_page: 1, total_pages: Math.ceil(deals.length / prev.items_per_page), data: deals?.slice(0, prev.items_per_page) }
                });
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

    const paginate = (type: string) => {
        if (type === "next" && pagination.current_page < pagination.total_pages) {
            setPagination((prev: any) => {
                const nextPage = prev.current_page + 1;
                const startIndex = (nextPage - 1) * prev.items_per_page;
                const endIndex = startIndex + prev.items_per_page;
                const data = invites.slice(startIndex, endIndex);
                return { ...prev, current_page: nextPage, data };
            });
        } else if (type === "previous" && pagination.current_page > 1) {
            setPagination((prev: any) => {
                const prevPage = prev.current_page - 1;
                const startIndex = (prevPage - 1) * prev.items_per_page;
                const endIndex = startIndex + prev.items_per_page;
                const data = invites.slice(startIndex, endIndex);

                return { ...prev, current_page: prevPage, data };
            });
        }
    };

    return (
        <section className="mt-10">
            <Table columns={columns} pagination={pagination} paginate={paginate} onclick={(row: any) => {
                if (row?.Status !== ApplicationStatus.SUBMITTED) {
                    dispatch(saveDataHolder(row.id));
                    navigate(`/create-deal/${row?.State?.current_step + 2}`);
                }
            }} noDataNode={<span className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">No Data</span>} />
        </section>
    )
};
export default InvitedSyndicates;