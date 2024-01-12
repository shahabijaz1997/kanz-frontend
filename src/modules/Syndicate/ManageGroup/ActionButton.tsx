import { useEffect, useRef, useState } from "react"
import ManageGroupActionsIcon from "../../../ts-icons/ManageGroupActionsIcon.svg"
import { delRemoveInvestor } from "../../../apis/syndicate.api"
import { toast } from "react-toastify"
import { toastUtil } from "../../../utils/toast.utils"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux-toolkit/store/store"

const ActionButton = ({ investorID, setLoading, getMembers }: any): any => {
    const [openActions, setOpenActions] = useState(false)
    const ref: any = useRef()
    const authToken: any = useSelector((state: RootState) => state.auth.value)
    const user: any = useSelector((state: RootState) => state.user.value)
  const language: any = useSelector((state: RootState) => state.language.value);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpenActions(false)
        }
        }

        window.addEventListener("mousedown", handleOutsideClick)

        return () => {
        window.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [])

    const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setOpenActions(current => !current)
    }

    const onDeleteInvestor = async (currSyndId: any, investorID: any) => {
        setLoading(true)
        try {
            const { status } = await delRemoveInvestor(
            currSyndId,
            investorID,
            authToken
            )
            if (status === 200) {
            toast.dismiss()
            toast.success(language?.v3?.syndicate?.investor_deleted, toastUtil)
            }
        } catch (error: any) {
            if (error?.response?.status === 400)
            toast.warning(error?.response?.data?.status?.message, toastUtil)
        } finally {
            getMembers()
            setLoading(false)
        }
        }

    return (
        <div
            onClick={handleButtonClick}
            ref={ref}
        >   
            <div className="inline-flex items-center  justify-center  w-[30px] h-[30px] rounded-full transition-all hover:bg-cbc-transparent">
                <ManageGroupActionsIcon />
            </div>
            {openActions && (
                <div className="overflow-hidden justify justify-center shadow-lg  rounded-md  flex-col bg-white border-[1px] border-neutral-200   z-[20] fixed items-center font-normal bg-red text-left">
                    <div
                    onClick={() => {}}
                    className="w-full items-center p-3 hover:bg-[#F5F5F5]"
                    >
                    {language?.v3?.syndicate?.view_details}
                    </div>
                    <div
                    onClick={() => {
                        onDeleteInvestor(user.id, investorID)
                    }}
                    className="w-full items-center p-3 hover:bg-[#F5F5F5]"
                    >
                    {language?.v3?.syndicate?.remove}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ActionButton