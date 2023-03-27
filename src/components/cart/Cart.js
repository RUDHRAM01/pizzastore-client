import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from '../header/Header'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
const Cart = () => {
  const [cart, setCart] = useState([])

  useEffect(() => {
    async function fetchData() {
      const id = localStorage.getItem('id')
      axios.get(`http://localhost:8000/cart/${id}`).then((res) => {
        let data = res?.data[0]?.data
        data === null ? console.log("") : setCart(data)
    })
    }
    fetchData();
  }, [])

  console.log(cart)
  return (
    <>
      <Header />
      <div style={{display:'flex',alignItems:'center',backgroundColor:'black',position:'fixed'}}>
        {(cart === null || cart === undefined) ? <></> :
          <>
          <Button variant="contained">
          Place Order
        </Button></>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '8vh', width: '100%', flexDirection: '' ,backgroundColor:'black', minHeight:'92vh',height:'auto'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '25px 200px', width: '80%',padding:'20px' }}>
          {cart === null || cart?.length === 0 || cart === undefined ? <><Typography variant="h4" style={{color:'white'}}>No item added</Typography></> : 
        cart?.map((item, index) => {
            return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px', height: '300px', border: '1px solid white', borderRadius: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50%',color:'white' }}>
                <h3 style={{color:'white'}}>{item?.name}</h3>
                <h4 style={{color:'white'}}>{item?.price}</h4>
                <h4 style={{color:'white'}}>{item?.quantity}</h4>
              </div>
            </div>
          })
          }
        </div>
        
      </div>
      
    </>
  )
}

export default Cart