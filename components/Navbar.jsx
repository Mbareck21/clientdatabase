'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Chip,
    Avatar,
    Typography,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const user = session?.user;

    const navButtonSx = (href) => ({
        color: 'common.white',
        px: 2,
        borderRadius: 2,
        fontWeight: pathname === href ? 700 : 500,
        bgcolor: pathname === href ? 'rgba(255,255,255,0.16)' : 'transparent',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.10)' },
    });

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{ bgcolor: 'appbar.main', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
            <Toolbar variant="regular" sx={{ gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                    <GavelIcon fontSize="small" sx={{ color: 'common.white' }} />
                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            color: 'common.white',
                            textDecoration: 'none',
                            fontWeight: 700,
                            letterSpacing: 0.2,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Case Manager
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
                    <Button component={Link} href="/" sx={navButtonSx('/')}>Home</Button>
                    <Button component={Link} href="/dashboard" sx={navButtonSx('/dashboard')}>Dashboard</Button>
                </Box>

                {user?.name && (
                    <Chip
                        avatar={<Avatar>{user.name[0]?.toUpperCase()}</Avatar>}
                        label={user.name}
                        variant="outlined"
                        sx={{
                            color: 'common.white',
                            borderColor: 'rgba(255,255,255,0.4)',
                            mr: 1,
                            '& .MuiChip-avatar': { color: 'common.white' },
                        }}
                    />
                )}

                {status === 'authenticated' ? (
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button component={Link} href="/register" variant="contained" color="primary">
                        Register
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
