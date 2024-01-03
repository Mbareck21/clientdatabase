'use client';
import { useRouter } from 'next/navigation'
import ClientsList from "@/components/ClientList";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

export default function Home() {
	const router = useRouter();
	

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Typography variant="h3">Home Page</Typography>
		</Box>
	);
}
