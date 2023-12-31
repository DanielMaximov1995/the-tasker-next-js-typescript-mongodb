'use client'
import { Button } from '@/components/ui/button'
import {useMobileSidebar} from "@/hooks/use-mobile-sidebar";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {MenuIcon} from "@/components/Icons";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import Sidebar, {SideBarProps} from "@/components/Platform/Layout/Sidebar/Sidebar";

const MobileSidebar = () => {
    const { isOpen , onClose , onOpen } = useMobileSidebar((state => state))
    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    },[])

    useEffect(() => {
        onClose()
    },[pathname , onClose])

    if (!isMounted) {
        return null
    }

    return (
        <>
         <Button variant='ghost' size='sm' className='block md:hidden' onClick={onOpen}>
            <MenuIcon fontSize={25}/>
         </Button>
            <div className='absolute'>
                <Sheet open={isOpen} onOpenChange={onClose}>
                    <SheetContent
                        side="right"
                        className="p-2 pt-20"
                    >
                        <Sidebar/>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}
export default MobileSidebar
