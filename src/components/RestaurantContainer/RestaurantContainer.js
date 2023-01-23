import React, { useEffect } from 'react'
import tableChair from "../../assets/tableChair.svg"
import search from "../../assets/search.svg"
import "./RestaurantContainer.css"
// import hamburger from "../../assets/hamburger.svg"
// import kfc from "../../assets/kfc.png"
// import pizza from "../../assets/pizza-hut.svg"
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/authcontext'

const RestaurantContainer = () => {
    let {vendorId }= useParams()
    let {GetAllVendorsFood,getVendorsFood}= useAuth()


    useEffect(()=>{
        GetAllVendorsFood(vendorId)
    })
  return (
    <div>
        <div className='rest-header'>
            <h3>Restaurants<span><img src={tableChair} alt="" /></span></h3>
            <form className='rest-form'>
                <input type="text" placeholder="Search"  />
                <img src={search} alt="" />
            </form>
        </div>
        {
            getVendorsFood.map((elem)=>(
                <section className="restaurant-card" key={elem.id}>
                <img src={elem.img} alt="" />
                <div>
                    <h3>{elem.name}</h3>
                    <p>
                    {elem.description}
                    </p>
                    <p>
                    {elem.price}
                    </p>
                </div>
            </section>
            ))
        }
     

    </div>
  )
}

export default RestaurantContainer