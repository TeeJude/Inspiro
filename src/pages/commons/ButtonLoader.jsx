import React from "react";

export  const ButtonLoader =({status})=>{
    return (
        <>
            {
                status ?
                <div className="btn-loader-wrapper">
                    <div className="loader"></div>
                </div>
                :
                null
            }
        </>
    )
}