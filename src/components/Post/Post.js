/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
// import fries from "../../assets/fries.svg"
// import hamburger from "../../assets/hamburger.svg"
// // eslint-disable-next-line no-unused-vars
// import pizza from "../../assets/pizza.svg"
import post from "../../assets/post.svg"
import "./Post.css"
import { useAuth } from '../../context/authcontext'
import { Link } from 'react-router-dom'

const Post = () => {
  const {GetAllVendors,getVendors} = useAuth()

  useEffect(()=>{
      GetAllVendors()
    
  },[])
  return (
    <div className='post'>
      
        <h3>Restaurant{" "} <span><img src={post} alt="" /></span></h3>
        <div className='flexDiv'>
          {
            // eslint-disable-next-line array-callback-return
            getVendors.map((elem)=>{
              <>
             
              <div key={elem.id}>
              <Link to={`/restaurant/${elem.id}`}>
              <img src={elem.coverImage} alt="" />
              <h3>{elem.restaurantName}</h3>
              </Link>
              </div>
             
              </>
             
            })
          }
         
          
           </div>
    
    </div>
  )
}

export default Post
