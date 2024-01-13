'use client';

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import columns from './columns'
// import { Box } from "@mui/material";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";

const getClients = async () => {
	try {
		const res = await fetch("/api/clients", {
			cache: "no-store"
		})
		if (!res.ok) {
			throw new Error('Failed to fetch Data!')
		}
		return res.json()
	} catch (error) {
		console.log(error);
	}
}
export default function ClientsList() {


	const [rows, setRows] = useState([])

	React.useEffect(() => {
		clientGetter();
	}, []);

	const clientGetter = async () => {
		const response = await getClients();
		let clients = [];
		if (response) {
			clients = response;
		}

		clients.map((c) => {
			return { ...c, id: c._id };
		});
		setRows(clients);
	};

	const getRowId = (row) => {
		return row._id;
	};


	return (

		<Paper elevation={4}

			sx={{
				height: 'auto',
				color: '#1a3e72',

				'& .super-app-theme--cell': {
					backgroundColor: '#E3DAC9',
					color: '#1a3e72',
					fontWeight: '600',
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
				}

			}}>

			<DataGrid
				autoHeight
				sx={{ '--DataGrid-overlayHeight': '300px' }}
				rows={rows}
				// loading= {loading}
				getRowId={getRowId}
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
							pageSize: 50,
						},
					},
				}}
				pageSizeOptions={[50]}
				disableRowSelectionOnClick

			/>
		</Paper>

	);
}
