'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Button, Box, Chip, Avatar } from '@mui/material';
import { signOut } from 'next-auth/react';
import useSessionState from './useSessionState'

export default function Navbar() {
    const session = useSessionState();

    return (
        <AppBar position="fixed" sx={{ bgcolor: '#39393a', color: 'primary.contrastText' }}>
            <Toolbar variant="regular">
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button sx={{ color: 'primary.contrastText', bgcolor: 'primary.dark' }}>Home</Button>
                    </Link>
                    <Link href="/dashboard" passHref>
                        <Button sx={{ color: 'primary.contrastText' }}>Dashboard</Button>
                    </Link>
                </Box>
                {session?.user?.name && <Box sx={{ flexGrow: 1 }}>
                    <Chip avatar={<Avatar>{session?.user?.name && session.user.name[0]}</Avatar>} label={session?.user?.name && session.user.name + ' connected'} color="info" variant="outlined" />
                </Box>
                }
                {session ? ( // Check if session exists
                    <Button sx={{ color: 'white', bgcolor: 'red' }} onClick={() => signOut()}>
                        Logout
                    </Button>
                ) : (
                    <Link href="/register" passHref>
                        <Button sx={{ color: 'primary.contrastText', bgcolor: 'secondary.dark' }}>Register</Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
}
