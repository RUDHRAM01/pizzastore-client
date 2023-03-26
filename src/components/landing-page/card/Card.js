import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AiOutlineShoppingCart } from 'react-icons/ai';

function PizzaCard({ name, img, price, description }) {
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
                        <Button size="small" startIcon={<AiOutlineShoppingCart />} >
                            +
                        </Button>
                </div>
            </CardActions>
        </Card>
    );
}

export default PizzaCard;