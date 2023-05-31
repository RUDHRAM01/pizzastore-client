import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaPizzaSlice } from 'react-icons/fa';
import Header from '../header/Header'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Grid } from '@mui/material'
import './Cart.scss'
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
        }
      }).then((res) => {
        let data = res?.data[0]?.data
        data === null ? console.log("") : setCart(data)
      })
    }
    fetchData();
  }, [token])

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
  let total = 0;
  return (
    <>
      <Header />
      <Container maxWidth="md" style={{ marginTop: "10vh" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" >CheckOut</Typography>
          <span class="material-icons">
            navigate_next
          </span>
        </div>
        <div style={{ display: "flex", width: "100%" }}>
          <Grid container>
            <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'white', backgroundColor:"black" }}>No.</Typography></Grid>
            <Grid item xs={4} md={4}><Typography variant='subtitle1' style={{ color: 'white', backgroundColor:"black" }}>Name</Typography></Grid>
            <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'white', backgroundColor:"black" }}>Price</Typography></Grid>
            <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'white', backgroundColor:"black" }}>Quantity</Typography></Grid>
            <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'white', backgroundColor:"black" }}>quantity * price</Typography></Grid>
            {cart === null || cart?.length === 0 || cart === undefined ? <><Typography variant="h4" style={{ color: 'black' }}>No item added</Typography></> :
              cart?.map((item, index) => {
                total = total + (item?.quantity * item?.price);
                return <>
                  <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'black' }}>{index + 1}</Typography></Grid>
                  <Grid item xs={4} md={4}><Typography variant='subtitle1' style={{ color: 'black' }}>{item?.name}</Typography></Grid>
                  <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'black' }}>{item?.price} rs</Typography></Grid>
                  <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'black' }}>{item?.quantity}</Typography></Grid>
                  <Grid item xs={2} md={2}><Typography variant='subtitle1' style={{ color: 'black' }}>{item?.quantity * item?.price} rs</Typography></Grid>
                </>
              })
            }
          </Grid>
          
        </div>
        <Grid container spacing={0} >
          <Grid item xs={2}><Typography style={{color:"white",backgroundColor:"black"}} variant="h6">Total: </Typography></Grid>
          <Grid item xs={10}><Typography style={{color:"white",backgroundColor:"black"}}variant="h6">{total} rs</Typography></Grid>
          </Grid>
      </Container>
    </>
  )
}

export default Cart