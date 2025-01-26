import { useCallback, useEffect } from 'react'

export function useCopyDisable({disabled=true}){
    const handleCopy = useCallback((e) => {
        e.preventDefault()
    },[])

    useEffect(() => {
        if(!disabled){
            document.addEventListener("copy", handleCopy)
            console.log("can copy")
            return () => {
                document.removeEventListener('copy', handleCopy)
            }
        } else {
            console.log("cant copy")
            document.removeEventListener('copy', handleCopy)
        }
    },[disabled, handleCopy])

    return
}