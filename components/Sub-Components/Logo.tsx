import React from "react";
import Link from "next/link";
import { InlineIcon } from '@iconify/react';

interface LogoProps {
    className: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link href={'/'} passHref>
            <a className={'flex flex-col justify-center items-center my-2 text-primary py-3 select-none ' + className}>
                <span className={'text-2xl tracking-wider font-light'}>
                    <InlineIcon className={'inline-block text-2xl align-bottom mr-2'} icon={"ph:radio-thin"}/>
                    <span>RABURADIO</span>
                </span>
                <span className={'opacity-50 text-sm tracking-widest font-light'}>ラブラジオ</span>
            </a>
        </Link>
    )
}

export default Logo
