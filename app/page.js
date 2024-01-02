'use client';
import { useRouter } from 'next/navigation'
import ClientsList from "@/components/ClientList";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
export default function Home() {
	const router = useRouter();
	

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					
			<Stack direction="row" spacing={2}>
				<Button variant="contained" onClick={() => router.push('/addClient')}>Add Client</Button>
				<Button variant="contained">Logout</Button>
			</Stack>
				</Grid>
				<Grid item xs={12}>

		<ClientsList />
				</Grid>
		  </Grid>
		</Box>
	);
}
