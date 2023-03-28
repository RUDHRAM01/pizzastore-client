import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { FaPizzaSlice } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



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
                
            }
        }

        return (
            <AppBar position="fixed" className='header' style={{ backgroundColor: 'black' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FaPizzaSlice style={{ marginRight: '8px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Pizza
                        </Typography>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Pizza
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button sx={{ my: 3, color: 'white', display: 'block', visibility: 'hidden' }}></Button>
                        </Box>

                        <Box sx={{ flexGrow: 0, }} style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <Tooltip title="cart">
                                    <IconButton sx={{ p: 0 }} onClick={() => navigate("/cart")}>
                                        <AiOutlineShoppingCart style={{ fontSize: '1.5rem', marginRight: '16px', color: "white" }} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                                        <MenuItem onClick={() => handle('logout')}>Logout</MenuItem>
                                    )}
                                </Menu>
                            </div>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
export default Header;