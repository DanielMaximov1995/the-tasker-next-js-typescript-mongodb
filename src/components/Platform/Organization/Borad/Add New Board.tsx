'use client'

import {useState} from "react";
import {CustomEvent, CustomEventTarget} from '@/types/others'
import FloatLabelTextSmall from "@/components/Float Label Text Small";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {addNewBoard} from "@/services/fetch";
import {OrgSettingsType} from "@/components/Platform/Organization/Settings/Main Settings Comp";
import {useRouter} from "next/navigation";
import ImagePicker from "@/components/Image Picker";
import {BoardModelType} from "@/types/Schema";


const AddNewBoard = (props : OrgSettingsType) => {
    const { organization } = props
    console.log(organization)
    const [board, setBoard] = useState<BoardModelType>({
        title : "" ,
        imageFullUrl : "" ,
        imageLinkHTML : "" ,
        imageThumbUrl : "" ,
        orgId : organization?._id?.toString()!
    });
    const router = useRouter()

    const handleChange = (e : CustomEvent | CustomEventTarget) => {
        const { name , value } = e.target
        setBoard(prev => ({...prev, [name] : value}))
    }

    const handleSubmit = () => {
        toast.promise(addNewBoard(board) , {
            loading : "מוסיף לוח חדש...",
            success : (data) => {
                router.refresh()
                return data.message
            },
            error : (data) => {
                return data.message
            }
        })
    }

    return (
        <div>
            <p className='font-semibold'>לוח חדש ל-{organization?.name}</p>
            <div className='flex flex-wrap'>
                <div className='w-full p-2'>
                <ImagePicker name="image" handleChange={handleChange}/>
                </div>
                <div className='w-full p-2'>
                <FloatLabelTextSmall className='w-full' handleChange={handleChange} label={"שם הלוח"} name={"title"} value={board.title || ""} input={"text"}/>
                </div>
                <div className='w-full p-2'>
                <Button onClick={handleSubmit} className='w-full'>צור חדש</Button>
                </div>
            </div>
        </div>
    )
}
export default AddNewBoard
