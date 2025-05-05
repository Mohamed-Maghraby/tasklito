import { useState, useEffect, use } from "react"


function outsideClick (WrappedComponent, onClick) {
    return (props) => {

        useEffect(()=>{
            document.addEventListener('onClick', onClick) 
            return  document.removeEventListener('onClick', onClick) 
        }, [])


        return <WrappedComponent {...props}></WrappedComponent>
    }
    
}