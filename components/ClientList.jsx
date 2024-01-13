'use client';

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import columns from './columns'
import { Box, Button } from "@mui/material";

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
const [rows, setRows]= useState([])
const [loading, setLoading]= useState(true)
	 

React.useEffect(() => {
  clientGetter(); // call the clientGetter function
}, []); // pass an empty dependency array to run only once

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
	setLoading(false)
};
const getRowId = (row) => {
  return row._id;
};
	

	return (
		
		<Paper elevation={4}

			sx={{
				height: '100%',
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
					<Button variant="contained" color="success"	 href="/addClient" >Add Client</Button>
			<DataGrid
				rows={rows}
				loading= {loading}
				getRowId={getRowId}
				columns={columns()}
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
					},
				}}
			
			/>
			</Paper>
		
	);
}
