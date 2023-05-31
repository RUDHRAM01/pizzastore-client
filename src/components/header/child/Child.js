import { Box, Button, Container } from '@mui/material'
import React from 'react'
import '../header.scss'
function Child() {
    const category = ['Margherita', 'Paneer', 'Mexican', 'Veggie', 'Corn', 'Makhani', 'Tandoori', 'Chicken', 'Tikka']
    return (
        <>
            <Container maxWidth="md" className='childContainer' style={{ display: "flex", gap: "5px", flexWrap:"wrap",position:"sticky",top:"8vh",backgroundColor:"black",padding:"8px",zIndex:9999 }}>
                <Box style={{ display: "flex"}}>
                    <input placeholder='search...' type="search" className='search' />
                    <Button variant="text" style={{ backgroundColor: "red", height: "40px" }}>
                        <i class="fa fa-search" style={{ color: "white" }}></i>
                    </Button>
                </Box>
                <Box className='category'>
                    {category.map((i) => {
                        return (
                            <>
                                <div className='categoryChild'><Button style={{ color: "white" }}>{i}</Button></div>
                            </>
                        )
                    })}
                </Box>
            </Container>
        </>
    )
}

export default Child