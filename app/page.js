import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from './api/auth/[...nextauth]/route'
export default async function Home() {
	const session = await getServerSession(authOptions)
	if (session) redirect("/dashboard")

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Typography variant="h5">Home Page</Typography>
			<LoginForm />

		</Box>
	);
}
