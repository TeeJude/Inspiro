import React from "react";

export  const ScreenLoader =({status})=>{
    return (
        <>
            {
                status ?
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
                :
                null
            }
        </>
    )
}