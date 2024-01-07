'use client';
import { signOut, useSession } from 'next-auth/react';
import { Typography, Card, CardActionArea, Button, Link, CardContent, CardActions, Avatar } from "@mui/material";

export default function AdminInfo() {
    const { data: session } = useSession();

    // Use a placeholder image URL for the avatar
    const placeholderImage = "https://via.placeholder.com/100";

    return (
        <Card sx={{ maxWidth: 250, marginTop: 2, marginBottom: 'auto' }}>
            <CardActionArea>
                <CardContent>
                    {/* Add the Avatar component with the src and variant props */}
                    <Avatar src={placeholderImage} variant="rounded" />
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
                    SignOut
                </Button>
            </CardActions>
        </Card>
    );
}
