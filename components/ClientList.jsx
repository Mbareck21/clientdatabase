'use client';

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from '@mui/x-data-grid/components';
import columns from './columns'
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link'
import { dataGridColors } from "@/app/theme";

function CustomToolbar() {
	return (
		<GridToolbarContainer sx={{ p: 1, gap: 1, flexWrap: 'wrap' }}>
			<GridToolbar />
			<Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
				<GridToolbarQuickFilter />
				<Button component={Link} href="/addClient" variant="contained" size="small" startIcon={<AddIcon />}>
					Add Client
				</Button>
			</Box>
		</GridToolbarContainer>
	);
}

const useClients = (page, limit) => {
	const [clients, setClients] = useState([]);
	const [totalClients, setTotalClients] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		const getClients = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/clients?page=${page}&limit=${limit}`, {
					cache: "default",
				});
				if (!res.ok) {
					throw new Error('Failed to fetch Data!');
				}
				const resData = await res.json();
				if (!active) return;
				setClients(resData.clients);
				setTotalClients(resData.totalClients);
			} catch (error) {
				console.error(error);
			} finally {
				if (active) setLoading(false);
			}
		};
		getClients();
		return () => { active = false; };
	}, [page, limit]);

	return { clients, totalClients, loading };
};

const ClientsList = () => {
	const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });

	const { clients, totalClients, loading } = useClients(paginationModel.page + 1, paginationModel.pageSize);

	const rowsWithId = clients.map(c => ({ ...c, id: c._id }));

	return (
		<Box sx={{ maxWidth: 1400, mx: 'auto' }}>
			<Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
				Clients
			</Typography>
			<Box
				sx={{
					height: 'auto',
					'& .super-app-theme--cell': {
						backgroundColor: dataGridColors.headerBg,
						color: dataGridColors.headerText,
					},
					'& .super-app': { color: dataGridColors.cellText },
					'& .super-app.gc': { backgroundColor: 'rgba(157, 255, 118, 0.49)' },
					'& .super-app.as': { backgroundColor: 'rgba(255, 157, 118, 0.49)' },
					'& .super-app.ad': { backgroundColor: '#DDD06A' },
					'& .super-app.adr': { backgroundColor: '#DDD06A' },
					'& .super-app.ca': { backgroundColor: 'rgba(157, 118, 255, 0.49)' },
					'& .super-app.cc': { backgroundColor: '#0095B6' },
					'& .super-app.c': { backgroundColor: '#0095B6' },
					'& .super-app.p': { backgroundColor: '#C19A6B' },
					'& .super-app.i': { backgroundColor: '#E3DAC9' },
					'& .super-app.car': { backgroundColor: 'rgba(157, 118, 255, 0.49)' },
					'& .super-app-theme--header': {
						backgroundColor: dataGridColors.headerBg,
						color: dataGridColors.headerText,
						fontWeight: '700',
					},
				}}>

				<DataGrid
					autoHeight
					sx={{
						'--DataGrid-overlayHeight': '300px',
						bgcolor: 'background.paper',
						borderRadius: 2,
					}}
					rows={rowsWithId}
					loading={loading}
					density="compact"
					columns={columns()}
					slots={{
						toolbar: CustomToolbar,
						noRowsOverlay: CustomNoRowsOverlay,
					}}
					rowCount={totalClients}
					paginationMode="server"
					paginationModel={paginationModel}
					onPaginationModelChange={setPaginationModel}
					pageSizeOptions={[20]}
					disableRowSelectionOnClick
				/>
			</Box>
		</Box>
	);
}

export default ClientsList;
