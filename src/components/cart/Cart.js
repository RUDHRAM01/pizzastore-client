import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Header from '../header/Header'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Snackbar } from '@mui/material'
const Cart = () => {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()
  const [message, setMessage] = useState('order placed')
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token')
  useEffect(() => {
    async function fetchData() {
      const id = localStorage.getItem('id')
      if (id === null || id === undefined) return;
      axios.get(`http://localhost:8000/cart/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } }).then((res) => {
        let data = res?.data[0]?.data
        data === null ? console.log("") : setCart(data)
      })
    }
    fetchData();
  },[token])

  const handle = async () => {
    const id = localStorage.getItem('id')
    if (id === null || id === undefined) { navigate("/login"); return };
    if (cart === null || cart?.length === 0 || cart === undefined) {
      setMessage("no item added");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2000);
      return;
    }
    await axios.post(`http://localhost:8000/order`, { id, cart }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    },).then((res) => {
      console.log(res)
    }).catch((e) => {
      console.log(e)
    })
    setMessage("order placed");
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setCart([])
    await axios.post("http://localhost:8000/cart", { userId: id, data: [] },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    );
    navigate("/")
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'black', position: 'fixed' }}>

        <Button variant="contained" onClick={handle}>
          Place Order
        </Button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '8vh', width: '100%', flexDirection: '', backgroundColor: 'black', minHeight: '92vh', height: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '25px 200px', width: '80%', padding: '20px' }}>
          {cart === null || cart?.length === 0 || cart === undefined ? <><Typography variant="h4" style={{ color: 'white' }}>No item added</Typography></> :
            cart?.map((item, index) => {
              return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px', height: '300px', border: '1px solid white', borderRadius: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50%', color: 'white' }}>
                  <h3 style={{ color: 'white' }}>{item?.name}</h3>
                  <h4 style={{ color: 'white' }}>{item?.price}</h4>
                  <h4 style={{ color: 'white' }}>{item?.quantity}</h4>
                </div>
              </div>
            })
          }
        </div>

      </div>
      <Snackbar
        open={open}
        message={`${message}`}
      />

    </>
  )
}

export default Cart