'use client'

import {ListModelType} from "@/types/Schema";
import {ElementRef, useRef, useState} from "react";
import {toast} from "sonner";
import {addNewLog, updateBoard, updateList} from "@/services/fetch";
import {useRouter} from "next/navigation";
import {useEventListener} from "usehooks-ts";
import ListOptions from "@/components/Platform/Board/List/List Options";
import {useSession} from "next-auth/react";

type ListHeaderType = {
    list : ListModelType;
    onAddCard : () => void;
    orgId : string;
}

const ListHeader = (props : ListHeaderType) => {
    const { list, onAddCard , orgId } = props
    const [title, setTitle] = useState(list.title);
    const [editMode, setEditMode] = useState(false);
    const {data } = useSession()

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const router = useRouter()

    const enableEditing = () => {
        setEditMode(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const onSubmit = (formData : FormData) => {
        const titleFromData = formData.get("title") as string;
        if(titleFromData === title) {
           return setEditMode(false)
        }


        let updatedList = {
            ...list,
            title : titleFromData
        }
        toast.promise(updateList(list?._id?.toString()! , updatedList) , {
            loading : "מעדכן את שם הרשימה...",
            success : async () => {
                setTitle(titleFromData)
                setEditMode(false)
                await addNewLog(`הרשימה ${list.title} עודכנה לשם ${updatedList.title}` , "update" , list?._id?.toString()! , data?.user?._id?.toString()! , "list" , orgId)
                router.refresh()
                return "שם הרשימה התעדכן..."
            },
            error : (data) => {
                return data.message
            }
        })
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener("keydown", onKeyDown);

    return (
        <div
            className='pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2'
        >
            {editMode ? (
                <form
                    ref={formRef}
                    action={onSubmit}
                    className="flex-0 px-[2px]"
                >
                    <input
                        ref={inputRef}
                        onBlur={onBlur}
                        name='title'
                        placeholder="Enter list title.."
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent focus:bg-transparent focus:outline-0 hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                    />
                    <button type="submit" hidden />
                </form>
            ) : (
                <p
                    onClick={enableEditing}
                    className="w-full text-sm text-right px-2.5 py-1 h-7 font-medium border-transparent"
                >
                    {title}
                </p>
            )}
            <ListOptions list={list} onAddCard={onAddCard} orgId={orgId}/>
        </div>
    )
}
export default ListHeader
