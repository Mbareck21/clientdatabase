'use client';
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@mui/material";

export default function AdminInfo() {
    const { data: session } = useSession();
    return <Button color="inherit" sx={{ bgcolor: 'error.main', color: 'white' }} onClick={signOut}>Logout</Button>

}
