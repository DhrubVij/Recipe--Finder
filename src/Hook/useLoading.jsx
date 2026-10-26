import { useState } from "react";


function useLoading(){
const [Loading ,setLoading]=useState(true);

const startLoading= ()=>setLoading(true);
const stopLoading= ()=> setLoading(false);

return{
    Loading,
    startLoading,
    stopLoading,
}
}
export default useLoading;