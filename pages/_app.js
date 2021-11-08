import '../styles/globals.css'
import Sidebar from "../components/Sidebar";

export default function MyApp({ Component, pageProps }) {
    return (
        <div className={'flex flex-row flex-nowrap'}>
            <Sidebar/>
            <div className={'w-80 flex-none'}/>
            <div className={'flex-auto h-screen'}>
                <div className={'mx-12 mt-6'}>
                    <Component { ...pageProps }/>
                </div>
            </div>
        </div>
    )
}
