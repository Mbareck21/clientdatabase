import Box from '@mui/material/Box';
import { Typography, Container, Paper } from '@mui/material';
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
	const session = await getServerSession(authOptions)
	if (session) redirect("/dashboard")

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				
			}}
		>
			<Container maxWidth="sm">
				<Paper elevation={8} sx={{ p: 4, borderRadius: '16px', textAlign: 'center' }}>
					<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
						Immigration Case Management System
					</Typography>
					<Typography variant="subtitle1" gutterBottom sx={{ color: '#555' }}>
						Efficiently manage your immigration cases with ease.
					</Typography>
					<Typography variant="body2" align="center" paragraph sx={{ color: '#777' }}>
						This system provides comprehensive tools for CRUD operations on client records, with features for organization, retrieval,
						and dynamic display based on case specifics. Securely powered by MongoDB.
					</Typography>
					<Box sx={{ mt: 3 }}>
						<LoginForm />
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}
