import React from "react";

import RenderArtist from "../Tools/RenderArtist";
import { InstrumentalTag, RadioDramaTag } from "./SongTags"
import CollapsibleMenu from "../MenuView/CollapsibleMenu";

export default function SongCard (props) {
    const useNat = false;
    const payload = props.payload
    if (payload === undefined) return null
    const title = payload.titleRom !== ""? (useNat? payload.titleNat : payload.titleRom) : payload.titleNat
    return (
        <div className={props.styles}>
            <div className={'flex h-full justify-between items-center text-sm px-3'}>
                <span className={'space-x-3 flex items-center'}>
                    <p className={"inline-block w-3.5 text-secondary"}>{payload.albumOrder}</p>
                    <p className={"inline-block max-w-1/2 font-light overflow-ellipsis"}>{title}</p>
                    {payload.artists.length === 0? null :
                        <span className={"inline-block italic font-light text-secondary"}>
                            <RenderArtist artists={payload.artists} native={useNat}/>
                        </span>
                    }
                    {payload.isInstrumental ? <InstrumentalTag/> : null}
                    {payload.isRadioDrama? <RadioDramaTag/> : null}
                </span>
                <span className={'flex-none flex items-center'}>
                    <p className={"inline-block font-light text-secondary"}>
                        {Math.floor(payload.length / 60)}:{(payload.length % 60+100).toString().slice(-2)}
                    </p>
                    <CollapsibleMenu className={'ml-2'} options={['Copy Link', 'Download']}/>
                </span>
            </div>
        </div>
    )
}
