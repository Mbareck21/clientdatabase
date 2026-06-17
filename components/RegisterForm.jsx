'use client'
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Container, Paper, CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation";

function RegisterForm() {
    // state for the form values
    const [formData, setFormData] = useState({
        name: "",
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
        const { email } = formData;
        try {
            const adminExistsRes = await fetch('/api/adminExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })
            const { admin } = await adminExistsRes.json();
            if (admin) {
                setError("An account with this email already exists")
                return;
            }

            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData }),
            });
            if (res.ok) {
                router.push("/");
            } else {
                const data = await res.json().catch(() => ({}));
                setError(data.message || "Failed to register. Please try again.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
            console.error('Register error: ', error?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 } }}>
                    <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                        Create an account
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 2 }}>
                        Register to access the case management dashboard.
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            fullWidth
                            margin="normal"
                            autoComplete="name"
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            fullWidth
                            margin="normal"
                            autoComplete="email"
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
                            autoComplete="new-password"
                            required
                        />
                        {error && <Alert severity='error' sx={{ mt: 1 }}>{error}</Alert>}
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
                            {loading ? "Creating account..." : "Register"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default RegisterForm;
