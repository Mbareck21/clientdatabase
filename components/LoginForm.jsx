'use client'
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Link } from "@mui/material"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"


function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })
            if (res.error) {
                setError("Invalid credentials")
                return;
            }
            router.push("/dashboard");
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }


    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: "0 auto",
                padding: 3,
            }}
        >
            <Typography variant="h4" align="center">
                Sign In
            </Typography>
            <Box component='form' onSubmit={handleSubmit}>

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    fullWidth
                    margin="normal"
                    required


                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    fullWidth
                    margin="normal"
                    required


                />
                {error && <Alert severity='error'><Typography variant="body1">{error} </Typography></Alert>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Sign In
                </Button>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Link href="/register" color="secondary">
                            Register here
                        </Link>
                    </Typography>
                </Box>


            </Box>
        </Box >
    );
}

export default LoginForm;
