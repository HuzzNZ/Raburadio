import {useGlobalState} from "state-pool";

export const useNative = () => {
    const [useNative] = useGlobalState('useNative')
    return useNative
}
