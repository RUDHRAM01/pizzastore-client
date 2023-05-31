import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FaPizzaSlice } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import guestIcon from "../../assests/images/guestIcon.jpg"
import Child from './child/Child';

function Header() {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const id = localStorage.getItem('id');
    let show = false;
    if (id === null || id === undefined) {
        show = true
    }

    const handle = (k) => {
        console.log(k)
        if (k === 'login') {
            navigate('/login')
        } else if (k === 'register') {
            navigate('/create-account')
        } else if (k === 'logout') {
            localStorage.removeItem('id')
            window.location = '/'

        } else if (k === 'orders') {
            navigate('/orders')
        } else if (k === '/') {
            navigate('/')
        }
    }

    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <FaPizzaSlice style={{ marginRight: '8px', color: "red" }} />
                    <Typography
                        variant="h6"
                        noWrap
                        color="black"
                    >
                        Pizza
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}></Box>
                    <Box>
                        <Tooltip title="cart">
                            <IconButton onClick={() => navigate("/cart")}>
                                <AiOutlineShoppingCart style={{ color: "black" }} />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar style={{ color: "black" }} alt="avatar" src={`${guestIcon}`} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {show ? (
                                <>
                                    <MenuItem onClick={() => handle('login')}>Login</MenuItem>
                                    <MenuItem onClick={() => handle('register')}>Register</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={() => handle('/')}>home</MenuItem>
                                    <MenuItem onClick={() => handle('orders')}>orders</MenuItem>
                                    <MenuItem onClick={() => handle('logout')}>Logout</MenuItem>
                                </>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Child />
            <div style={{position:"fixed",bottom:20,right:10,backgroundColor:"black",padding:"5px",borderRadius:"50%"}}>
                <span class="material-icons" style={{fontSize:"5vh",color:"white"}}>restaurant_menu</span>
            </div>
        </>
    );
}
export default Header;