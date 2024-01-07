import Link from "next/link";
import { AppBar, Toolbar, Button, Box, Chip } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/" passHref>
                        <Button color="inherit">Home</Button>
                    </Link>
                </Box>
                <Box sx={{ flexGrow: 1 }}>

                    <Chip label="Outlined" variant="outlined" />
                </Box>
                <Link href="/register" passHref>
                    <Button color="inherit">Register</Button>
                </Link>

                <Link href="/dashboard" passHref>
                    <Button color="inherit">Dashboard</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}
