'use client';
import { signOut, useSession } from 'next-auth/react';
import { Typography, Card, CardActionArea, Button, Link, CardContent, CardActions } from "@mui/material";

export default function AdminInfo() {
    const { data: session } = useSession();


    return (
        <Card sx={{ maxWidth: 250, marginTop: 2, marginBottom: 'auto' }}>
            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {session?.user?.name}
                        <Typography variant="body2" color="text.secondary">
                            {session?.user?.email}
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="error" variant="contained" onClick={signOut}>
                    Logout
                </Button>
            </CardActions>
        </Card>
    );
}
