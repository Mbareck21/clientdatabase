
import Link from "next/link";
import { AppBar, Toolbar, Button, Box, Chip, Avatar, Stack, } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import AdminInfo from "./AdminInfo";


export default async function Navbar() {
    const session = await getServerSession(authOptions)

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: '#39393a', color: 'primary.contrastText' }}>
                <Toolbar variant="regular">
                    <Box sx={{ flexGrow: 1, }}>
                        <Link href="/" passHref>
                            <Button sx={{ color: 'primary.contrastText' }}>Home</Button>
                        </Link>
                        <Link href="/dashboard" passHref>
                            <Button sx={{ color: 'primary.contrastText' }}>Dashboard</Button>
                        </Link>
                    </Box>
                    {session &&
                        <Box sx={{ flexGrow: 1 }}>
                            <Chip avatar={<Avatar> {session.user.name[0]}</Avatar>} label={session.user.name + ' connected'} color="info" variant="outlined" />
                        </Box>
                    }
                    <Stack spacing={2} direction="row">
                        <Link href="/register" passHref>
                            <Button sx={{ color: 'primary.contrastText' }} >Register</Button>
                        </Link>

                        {session &&
                            <Link href="/" passHref>
                                <AdminInfo />
                            </Link>
                        }
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}
