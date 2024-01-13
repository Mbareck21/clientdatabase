
import Link from "next/link";
import { AppBar, Toolbar, Button, Box, Chip, Typography, Stack, } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import AdminInfo from "./AdminInfo";


export default async function Navbar() {
    const session = await getServerSession(authOptions)

    return (
        <AppBar position="static"
            sx={{ bgcolor: "primary.dark" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button color="inherit" sx={{ bgcolor: 'primary.light' }}>Home</Button>
                    </Link>
                </Box>
                {session &&

                    <Box sx={{ flexGrow: 1 }}>

                        <Chip label={session.user.name || "Guest"} color="secondary" variant="outlined" />
                        <Chip label={session.user.email} variant="outlined" />
                    </Box>
                }
                <Stack spacing={2} direction="row">

                    <Link href="/register" passHref>
                        <Button color="inherit" sx={{ bgcolor: 'primary.light' }} >Register</Button>
                    </Link>

                    <Link href="/dashboard" passHref>
                        <Button color="inherit" sx={{ bgcolor: 'primary.light' }}>Dashboard</Button>
                    </Link>
                    {session &&
                        <Link href="/" passHref>
                            <AdminInfo />
                        </Link>
                    }
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
