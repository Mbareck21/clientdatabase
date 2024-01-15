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
		<Container maxWidth="md">
			<Paper elevation={3} sx={{ p: 2, mt: 3 }}>
				<Typography variant="h4" align="center" gutterBottom>
					Welcome to the Immigration Case Management System
				</Typography>
				<Typography variant="body1" align="center" gutterBottom>
					This system is designed to manage a database of over 1,000 clients for immigration case processing.
					It enables users to perform Create, Read, Update, and Delete (CRUD) operations on client records.
					The system features sorting capabilities similar to those found in spreadsheet applications,
					allowing for efficient organization and retrieval of client data. Additionally, it includes
					dynamic formatting features that adjust cell displays based on specific criteria such as case type,
					status, and pending actions. All client information is securely stored and managed in MongoDB,
					ensuring data security and integrity.
				</Typography>
			</Paper>
			<Box sx={{ flexGrow: 1, mt: 3 }}>
				<LoginForm />
			</Box>
		</Container>
	);
}
