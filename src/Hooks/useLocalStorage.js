import { useEffect, useState } from "react";

function getSavedVal(key, initialVal){
    const savedVal = JSON.parse(localStorage.getItem(key))
    if(savedVal) return savedVal;
    if(initialVal instanceof Function) return initialVal()
        return initialVal;
}

export default function useLocalStorage(key, initialVal){
    const [val , setVal] = useState(()=>{
       return getSavedVal(key, initialVal)
    })
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(val))
    },[val])
    
    return [val, setVal];
}