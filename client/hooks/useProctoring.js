import { useCopyDisable } from "./useCopyDisable";

export function useProctoring({
    preventCopy
}){
   if(preventCopy){
    console.log("copying disabled")
   }
   else{
    console.log("copying enabled")
   }
    useCopyDisable({disabled:preventCopy===false})
}