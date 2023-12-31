'use client'
import Logo from "@/components/Logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useSession} from "next-auth/react";
import RestrictedContentAuth from "@/components/RestrictedContentAuth";

type ButtonOptions = {
    label: string;
    href: string;
};

const Navbar = () => {
    const { status, data } = useSession()
    const isLogin = status === "authenticated"
    let lastOrg = typeof window !== 'undefined' ? localStorage.getItem('orgId') : null;

    const optionsButton: Record<string, ButtonOptions> = {
        "true": { label: "למנהלת המשימות", href: `/org/${lastOrg}` },
        "false": { label: "התחברות", href: "/sign-in" }
    };

    const ButtonOfNav = <Link href={optionsButton[isLogin.toString()]?.href} className='font-semibold'>
        {optionsButton[isLogin.toString()]?.label}
    </Link>;


    return (
        <header className='fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center'>
            <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
                <div className='hidden md:block'>
                    <Logo label='מנהל המשימות' size={30}/>
                </div>
                <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
                    <div className='md:hidden block'>
                        <Logo label='מנהל המשימות' size={30}/>
                    </div>
                    <Button size='sm' variant='outline' asChild>
                        <RestrictedContentAuth fullback={ButtonOfNav}>
                            <Link href={isLogin ? `/org/${lastOrg}` : '/sign-in'} className='font-semibold'>
                                { isLogin ? "לגשת למנהל המשימות" : "התחברות" }
                            </Link>
                        </RestrictedContentAuth>
                    </Button>
                </div>
            </div>
        </header>
    )
}
export default Navbar
