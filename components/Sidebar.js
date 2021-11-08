import Logo from "./Sub-Components/Logo";
import React from "react";

export default function Sidebar () {
    return (
        <div className={'w-80 h-screen bg-background-sidebar-light dark:bg-background-sidebar-dark flex-none shadow-2xl shadow-inner fixed'}>
            <div className={'space-y-4'}>
                <Logo/>
            </div>
        </div>
    )
}
