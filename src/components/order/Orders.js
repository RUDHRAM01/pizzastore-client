import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Header from '../header/Header'
import { Typography } from '@mui/material'
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem('token')
    useEffect(() => {
        async function fetchData() {
            const id = localStorage.getItem('id')
            if (id === null || id === undefined) return;
            axios.get(`http://localhost:8000/order/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
            }).then((res) => {
                setOrders(res.data);
            }).catch((e) => {
                console.log(e)
            })
        }
        fetchData();
    }, [])

    console.log(orders)


    return (
        <>
            <Header />
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'black', marginTop: '10vh' }}>
                <Typography variant="h2" color="white">
                    My Orders
                </Typography>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginTop: '0vh', width: '100%', flexDirection: '', backgroundColor: 'black', minHeight: '80vh', height: 'auto' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '25px 200px', width: '80%', padding: '20px' }}>
                    {orders === null || orders?.length === 0 || orders === undefined ? <><Typography variant="h4" style={{ color: 'white' }}>No item added</Typography></> :
                        orders?.map((items) => {
                           return items?.name.map((item, index) => {

                                return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '300px', height: '300px', border: '1px solid white', borderRadius: '10px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '50%', color: 'white' }}>
                                        <h3 style={{ color: 'white' }}>{item?.name}</h3>
                                        <h4 style={{ color: 'white' }}>{item?.price}</h4>
                                        <h4 style={{ color: 'white' }}>{item?.quantity}</h4>
                                    </div>
                                </div>

                            })
                        }
                        )}


                </div>
            </div>

        </>
    )
}

export default Orders