import { useEffect, useRef } from "react";

export default function Button({ text, onClick }){
    const btn = useRef()

    useEffect(() => {
        btn.current.addEventListener('click',(e)=>{
            let ripples = document.createElement('span');
            
            const horizontalPos = e.clientX - e.target.offsetLeft;
            const verticalPos = e.clientY - e.target.offsetTop;
            
            ripples.style.left = horizontalPos + "px";
            ripples.style.top = verticalPos + "px";
            
            btn.current.appendChild(ripples);
            
            setTimeout(()=>{
                ripples.remove();
            },1500);
        })
    })

    return (
        <button ref={btn} onClick={onClick}>{ text }</button>
    )
}