import '../styles/globals.css'
import Sidebar from "../components/Sidebar";
import {store, useGlobalState} from 'state-pool';
import {useEffect} from "react";
import {AppProps} from "next/app";

store.setState('useNative', false, {persist: true})
store.setState('useDarkMode', true, {persist: true})
store.setState('defaultDownloadFormat', 'mp3-320', {persist: true})
store.setState('pageLimit', 2, {persist: true})

export default function MyApp({ Component, pageProps }: AppProps) {
    const [useDarkMode] = useGlobalState('useDarkMode')

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('dark', 'light')
        root.classList.add(
            useDarkMode? 'dark' : 'light'
        );
    }, [useDarkMode])

    return (
        <div className={'flex flex-row flex-nowrap'}>
            <Sidebar/>
            <div className={'w-72 flex-none'}/>
            <div className={'flex-auto h-screen'}>
                <div className={'mx-12 mt-6 pb-6'}>
                    <Component { ...pageProps }/>
                </div>
            </div>
        </div>
    )
}
