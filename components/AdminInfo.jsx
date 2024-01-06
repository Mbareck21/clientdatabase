import { Container, Typography, Card, CardActionArea, Button, CardMedia, CardContent, CardActions } from "@mui/material";

export default function AdminInfo() {
    return (
        <Card sx={{ maxWidth: 250, marginTop: 2, marginBottom: 'auto' }}>
            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Admin
                        <Typography variant="body2" color="text.secondary">
                            Admin@Test.org
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="error" variant="contained">
                    Logout
                </Button>
            </CardActions>
        </Card>
    );
}