'use client';
import { useRouter } from 'next/navigation'
import ClientsList from "@/components/ClientList";
import {Button, Box, Stack, Grid} from '@mui/material/';
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
