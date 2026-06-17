'use client'
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Link, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
function LoginForm() {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // redirect:false so we can show the error inline; the navbar updates
            // reactively via useSession once the session cookie is set.
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })
            if (!res || res.error) {
                setError("Invalid email or password")
                return;
            }
            router.push("/dashboard")
            router.refresh()
        } catch (error) {
            setError("Something went wrong. Please try again.")
            console.error('Login error: ', error?.message);
        } finally {
            setLoading(false);
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
            <Box component='form' onSubmit={handleSubmit} autoComplete="">

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    fullWidth
                    margin="normal"
                    autoComplete="current-email"
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
                    autoComplete="current-password"
                    required


                />
                {error && <Alert severity='error'><Typography variant="body1">{error} </Typography></Alert>}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                    sx={{ mt: 3 }}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2">
                        Don&rsquo;t have an account?{' '}
                        <Link href="/register" color="secondary" underline="hover">
                            Register here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box >
    );
}

export default LoginForm;
