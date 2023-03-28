import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {useCallback } from 'react';
import axios from 'axios'
function PizzaCard({ index, cart , setCart, name, img, price, description }) {
  const handleChange = useCallback(async (name, price, action) => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    let copy = cart;
    copy === null || copy === undefined ? copy = [] : copy = cart;
    const item = copy.find((item) => item.name === name);
    
        if (item) {
          if (action === 'add') {
              console.log('add')
                item.quantity++;
              item.total = item.quantity * item.price;
              await axios.post("http://localhost:8000/cart", { userId: id, data: cart }, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
            } else {
                if (item.quantity > 1) {
                    item.quantity--;
                  item.total = item.quantity * item.price;
                  await axios.post("http://localhost:8000/cart", { userId: id, data: cart }, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  })
                } else {
                    const newCart = cart.filter((item) => item.name !== name);
                  setCart(newCart);
                  await axios.post("http://localhost:8000/cart", { userId: id, data: newCart }, {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                  })
                }
            }
        } else {
          let copy = cart;
          if (copy === null || copy === undefined) {
          setCart([
            { name, price, quantity: 1, total: price },
          ])
          } else {
            setCart((prev) => [
              ...prev,
              { name, price, quantity: 1, total: price },
            ]);
          }
          copy === null || copy === undefined ? copy = [] : copy = cart;
          copy.push({name,price,quantity: 1,total: price})
          
            await axios.post("http://localhost:8000/cart", { userId: id, data: copy }, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
        }
  }, [cart, setCart]);

  return (
    <Card sx={{ width: 345,height:320 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={img}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{display:'flex',width:'100%',alignItems:'center'}}>
          <Typography variant="subtitle2" color="#1976d2" style={{width:'70%',marginLeft:'8px'}}>
            {price} Rs
          </Typography>
          <Button size="small" onClick={() => handleChange(name, price, 'add')}>
            +
          </Button>
          <AiOutlineShoppingCart />
          <Button size="small" onClick={() => handleChange(name, price, 'subtract')} >
            -
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

export default PizzaCard;
