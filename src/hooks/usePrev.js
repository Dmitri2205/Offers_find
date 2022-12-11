import React,{useRef} from React;

export const usePrev = (data) => {
    const prevValue = useRef(data);
    useEffect(()=>{
        prevValue.current = data;
    },data)
    return prevValue;
}