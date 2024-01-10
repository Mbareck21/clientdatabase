'use client';
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@mui/material";

export default function AdminInfo() {
    const { data: session } = useSession();
    return       <Button size="small" color="error" variant="contained" onClick={signOut}>SignOut</Button>
       
}
