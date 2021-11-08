import React from "react";
import RenderArtist from "../Tools/RenderArtist";
import ListSongs from "../SongView/ListSongs";
import CollapsibleMenu from "../MenuView/CollapsibleMenu";

export default function AlbumCard (props) {
    const useNat = false
    const payload = props.payload
    if (props.payload === undefined) return null
    const mainTitle = payload.titleRom !== ""? payload.titleRom : payload.titleNat
    const imgUrl = `/albums/${payload.id}.jpg`
    return (
        <div className={'h-max w-144 relative mb-6 mr-6'}>
            <img src={imgUrl} alt={'Album Cover'} className={'h-26 w-auto bg-gray-200 absolute z-50 rounded-2xl transform rotate-355 shadow-lg'}/>
            <div className={'h-2'}/>
            <div className={'w-140 ml-4 bg-gray-100 shadow-lg rounded-2xl'}>
                <div className={'flex flex-nowrap max-w-full flex-none flex-row h-26'}>
                    <div className={'flex-shrink-0 w-20 mr-7'}/>
                    <div className={'mt-3 mr-4 w-full min-w-0'}>
                        <div className={'inline-flex w-full text-xl align-middle'}>
                            <p className={'inline-block flex-grow truncate mr-2'}>{mainTitle}</p>
                            <CollapsibleMenu className={'flex-none text-md inline-block'} options={['Copy Link']}/>
                        </div>
                        { payload.titleRom === ""? null : <p className={'text-xs text-secondary font-light tracking-wide truncate'}>{payload.titleNat}</p> }
                        <div>
                            <p className={'inline-block text-md text-primary'}>{<RenderArtist artists={payload.artists} native={useNat}/>}</p>
                            <p className={'inline-block text-secondary mx-1'}>·</p>
                            <p className={'inline-block text-secondary text-sm font-bold'}>{ (new Date(payload.releaseDate)).getUTCFullYear() }</p>
                        </div>
                    </div>
                </div>
                <ListSongs songs={payload.songs} lines={props.lines}/>
            </div>
        </div>
    )
}