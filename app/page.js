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
				minHeight: '80vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Container maxWidth="sm">
				<Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, textAlign: 'center' }}>
					<Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
						Immigration Case Management
					</Typography>
					<Typography variant="subtitle1" gutterBottom sx={{ color: 'text.secondary' }}>
						Track and manage your immigration cases in one place.
					</Typography>
					<Typography variant="body2" align="center" sx={{ color: 'text.secondary', mb: 1 }}>
						Securely organize client records, retrieve cases, and stay on top of key dates.
					</Typography>
					<Box sx={{ mt: 3 }}>
						<LoginForm />
					</Box>
				</Paper>
			</Container>
		</Box>
	);
}
