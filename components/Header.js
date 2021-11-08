import { InlineIcon } from "@iconify/react";

export default function Header (props) {
    return (
        <div>
            <h1 className={'text-primary'}>
                <InlineIcon className={'inline mr-2'} icon={props.icon || "ph:question-bold"}/>
                {props.title || 'Untitled Page'}
            </h1>
            <hr className={'mt-2'}/>
        </div>
    )
}
