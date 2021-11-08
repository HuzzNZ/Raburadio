import React from "react";
import { InlineIcon } from '@iconify/react';

function Logo () {
    return (
        <a className={'flex flex-col justify-center items-center my-2 text-primary py-2'} href={'http://localhost:3000/'}>
            <span className={'text-2xl tracking-wider font-light'}>
                <InlineIcon className={'inline-block text-2xl align-bottom mr-2'} icon={"ph:radio-thin"}/>
                <span>RABURADIO</span>
            </span>
            <p className={'opacity-50 text-sm tracking-widest font-light'}>ラブラジオ</p>
        </a>
    )
}

export default Logo
