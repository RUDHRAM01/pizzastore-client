import React, { useEffect } from 'react'
import Header from '../header/Header'
import Data from '../../common-data/Data.json'
import PizzaCard from './card/Card'
import { useState } from 'react'
import axios from 'axios'

const LandingPage = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const id = localStorage.getItem('id')
            if(id === null || id === undefined) return;
          axios.get(`http://localhost:8000/cart/${id}`).then((res) => {
          setCart(res.data[0]?.data)
        })
        }
        fetchData();
      }, [])
    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '10vh', width: '100%',flexDirection:''}}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '25px 200px', width: '80%'}}>
                    {Data.map((item, index) => {
                        return <PizzaCard index={index} cart={cart} setCart={setCart} name={item.name} img={item.img} price={item.price} description={item.description} />
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default LandingPage