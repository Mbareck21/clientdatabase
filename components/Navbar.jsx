import Link from "next/link";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button color="inherit">Home</Button>
                    </Link>
                </Box>
                <Link href="/register" passHref>
                    <Button color="inherit">Register</Button>
                </Link>
                <Link href="/login" passHref>
                    <Button color="inherit">Login</Button>
                </Link>
                <Link href="/dashboard" passHref>
                    <Button color="inherit">Dashboard</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}
