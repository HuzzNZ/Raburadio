import React from "react";

export const InstrumentalTag: React.FC = () => {
    return (
        <span className={'inline-block uppercase text-xxs font-light dark:text-white text-secondary italic px-1.5 bg-instrumental bg-opacity-10 dark:bg-opacity-40 tracking-wide rounded transition-colors duration-300'}>Off Vocal</span>
    )
}

export const RadioDramaTag: React.FC = () => {
    return (
        <span className={'inline-block uppercase text-xxs font-light dark:text-white text-secondary italic px-1.5 bg-radio bg-opacity-10 dark:bg-opacity-40 tracking-wide rounded transition-colors duration-300'}>Radio Drama</span>
    )
}
