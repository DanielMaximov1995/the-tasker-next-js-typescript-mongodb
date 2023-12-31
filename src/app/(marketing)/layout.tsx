import {PageAndLayoutType} from "@/types/others";
import dynamic from 'next/dynamic'
const Navbar = dynamic(() => import("@/components/Marketing/Navbar") , { ssr : false });


const MarketingLayout = (props: PageAndLayoutType) => {
    const {children} = props

    return (
        <div className='h-screen bg-slate-100'>
            <Navbar/>
            <main className="pt-40 pb-20 bg-slate-100">
                {children}
            </main>
        </div>
    )
}
export default MarketingLayout
