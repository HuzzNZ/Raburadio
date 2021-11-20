import {useEffect, useState} from "react";

export const useBaseURL = () => {
    const [baseURL, setBaseURL] = useState<string>('')

    useEffect(() => {
        setBaseURL(window.location.host)
    }, [])

    return baseURL
}
