import Header from "../components/Header";
import React from "react";

const Custom404: React.FC = () => {
    return (
        <div className={'space-y-3'}>
            <Header title={"OwO! The requested URL doesn't seem to exist..."}/>
        </div>
    )
}

export default Custom404
