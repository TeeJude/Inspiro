import React from "react"

export const Hero  = () => {
  return(
  <>
     <main className="hero">
      <div className="hero-text-wrapper">
        <h1
          className="ps-3 text-white"
        >
          Our Blog
        </h1>
        <p className="ps-3 lh-lg text-white">
          Stories, articles, financial tips from our professional <br />
          financial team.
        </p>
      </div>
    </main>

    <div className="container my-3">
      <form action="">
        <div className="row justify-content-center">
           <div className="col-sm-11 col-md-10 col-lg-8">
             <input type="text" className="form-control"  placeholder="Search for articles, blog posts or stories here..." />
           </div>
        </div>
      </form>
    </div>
  </>

  )
}