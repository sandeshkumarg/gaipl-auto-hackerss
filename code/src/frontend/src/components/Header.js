import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import WindowIcon from '@mui/icons-material/Window';
import '../App.css';

const Header = ({ onMenuClick, iconColor }) => {
    return (
        <AppBar position="static" className="header">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onMenuClick}>
                    <WindowIcon style={{ color: iconColor }} />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" component="div" className="header-title">
                        Integrated Platform Environment
                    </Typography>
                    <Typography variant="subtitle1" component="div" className="header-caption">
                        Your one-stop solution for managing and monitoring your platform
                    </Typography>
                </Box>
            
            </Toolbar>
        </AppBar>
    );
};

export default Header;