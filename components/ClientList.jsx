'use client';

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarQuickFilter } from '@mui/x-data-grid/components';
import columns from './columns'
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { Box, Button } from "@mui/material";
import Link from 'next/link'

function CustomToolbar() {
	return (
		<GridToolbarContainer>
			<GridToolbar />
			<Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
				<GridToolbarQuickFilter />
				<Link href="/addClient" passHref>
					<Button variant="contained" size="small" sx={{ ml: 2 }}>
						Add Client
					</Button>
				</Link>
			</Box>

		</GridToolbarContainer>
	);
}
const useClients = (page, limit) => {
	const [clients, setClients] = useState([]);
    const [totalClients, setTotalClients] = useState(0);

	const getClients = async () => {
		try {
			const res = await fetch(`/api/clients?page=${page}&limit=${limit}`, {
				cache: "default",
			});
			if (!res.ok) {
				throw new Error('Failed to fetch Data!');
			}
			const resData = await res.json();
			setClients(resData.clients);
            setTotalClients(resData.totalClients);

		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getClients();
	}, [page, limit]);

	return { clients, totalClients };
};

const ClientsList = () => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });

	const { clients, totalClients } = useClients(paginationModel.page + 1, paginationModel.pageSize);

	const rowsWithId = clients.map(c => {
		return { ...c, id: c._id };
	});

	return (
		<Box
			sx={{
				height: 'auto',
				// color: '#1a3e72',

				'& .super-app-theme--cell': {
					backgroundColor: '#E3DAC9',
					color: '#114e8b',
				},
				'& .super-app.gc': {
					backgroundColor: 'rgba(157, 255, 118, 0.49)',
					color: '#1a3e72'
				},
				'& .super-app.as': {
					backgroundColor: 'rgba(255, 157, 118, 0.49)',
					color: '#1a3e72'
				},
				'& .super-app.ad': {
					backgroundColor: '#DDD06A',
					color: '#1a3e72'
				},
				'& .super-app.adr': {
					backgroundColor: '#DDD06A',
					color: '#1a3e72'
				},
				'& .super-app.ca': {
					backgroundColor: 'rgba(157, 118, 255, 0.49)',
					color: '#1a3e72'
				},
				'& .super-app.cc': {
					backgroundColor: '#0095B6',
					color: '#1a3e72'
				},
				'& .super-app.c': {
					backgroundColor: '#0095B6',
					color: '#1a3e72'
				},
				'& .super-app.p': {
					backgroundColor: '#C19A6B',
					color: '#1a3e72'
				},
				'& .super-app.i': {
					backgroundColor: '#E3DAC9',
					color: '#1a3e72'
				},
				'& .super-app.car': {
					backgroundColor: 'rgba(157, 118, 255, 0.49)',
					color: '#1a3e72'
				},
				'& .super-app-theme--header': {
					backgroundColor: '#E3DAC9',
					color: '#114e8b',
					fontWeight: '700',

				},

			}}>

			<DataGrid
				autoHeight
				sx={{ '--DataGrid-overlayHeight': '300px' }}
				rows={rowsWithId}
				density="compact"
				columns={columns()}
				slots={{
					toolbar: CustomToolbar,
					noRowsOverlay: CustomNoRowsOverlay
				}}
                rowCount={totalClients}
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
				pageSizeOptions={[20]}
				disableRowSelectionOnClick

			/>
		</Box>

	);
}

export default ClientsList;