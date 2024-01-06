'use client'
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert, Container } from "@mui/material"
import { useRouter } from "next/navigation";

function RegisterForm() {
    // state for the form values
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ formData }),
            });
            if (res.ok) {
                const form = e.target
                form.reset();
            } else {
                throw new Error("Failed to register new admin");
            }
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
                Register
            </Typography>
            <Box component='form' onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    fullWidth
                    required
                    margin="normal"


                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    fullWidth
                    margin="normal"
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
                    Register
                </Button>


            </Box>
        </Box >
    );
}

export default RegisterForm;