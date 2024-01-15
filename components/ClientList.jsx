'use client';

import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import columns from './columns'
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import { Box } from "@mui/material";


const useClients = () => {
	const [clients, setClients] = useState([]);

	const getClients = async () => {
		try {
			const res = await fetch("/api/clients", {
				cache: "default",
			});
			if (!res.ok) {
				throw new Error('Failed to fetch Data!');
			}
			const resData = await res.json();
			setClients(resData);

		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getClients();
	}, []);

	return clients;
};

const ClientsList = () => {
	const clients = useClients();
	const rowsWithId = clients.map(c => {
		return { ...c, id: c._id };
	});




	return (
		<Box
			sx={{
				height: 'auto',
				color: '#1a3e72',

				'& .super-app-theme--cell': {
					backgroundColor: '#E3DAC9',
					color: '#1a3e72',
					fontWeight: '500',
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
					backgroundColor: '#e9ecef',
					color: 'primary.main',
					fontWeight: '600',

				},

			}}>

			<DataGrid
				autoHeight
				sx={{ '--DataGrid-overlayHeight': '300px' }}
				rows={rowsWithId}
				density="compact"
				columns={columns()}
				slots={{
					toolbar: GridToolbar,
					noRowsOverlay: CustomNoRowsOverlay
				}}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 20,
						},
					},
				}}
				pageSizeOptions={[20]}
				disableRowSelectionOnClick

			/>
		</Box>

	);
}

export default ClientsList;