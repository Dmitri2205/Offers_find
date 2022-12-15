import React,{Ref, useEffect} from 'react'


export default function useSlider(props: any){
    const sliderTrack = props.current;
    useEffect(()=>{
        if(sliderTrack){
            sliderTrack.addEventListener("touchstart",handleTouchStart);
            sliderTrack.addEventListener("touchend",handleTouchEnd);
            sliderTrack.addEventListener("touccancel",handleTouchCancel);
            sliderTrack.addEventListener("touchmove",handleTouchMove);
        }
    },[sliderTrack])


    let touchStartX:number;
    const handleTouchStart = (e: any) => {
        touchStartX = e.changedTouches[0].clientX - e.target.getBoundingClientRect().left;
        // console.log(touchStartX);
    }
    
    const handleTouchEnd = (e: any) => {
        console.log("Touch end");
    }
    const handleTouchCancel = (e: any) => {
        console.log(e);
    }
    let scrolled:number;
    const handleTouchMove = (e: any): void => {
        scrolled = touchStartX - e.changedTouches[0].clientX;
        const parentWidth = e.target.offsetParent.clientWidth;
        const boundingLeft = e.target.getBoundingClientRect().left;
        console.log(boundingLeft <= -(parentWidth))
        console.log(scrolled);
        if(scrolled > 0 && scrolled < parentWidth){
            sliderTrack.style.transform = `translateX(${-scrolled}px)`;
        }else if(scrolled <= (parentWidth-4) && scrolled > 0){
            sliderTrack.style.transform = `translateX(${-scrolled}px)`;
        }
    }
}