'use client';

import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

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
  // get the response from the api
  const response = await getClients();
  // initialize the clients variable to an empty array
  let clients = [];
  // check if the response has a clients property
  if (response) {
    // assign the clients property to the clients variable
    clients = response;
  }
	//   console.log(clients);
  // map over the clients array and assign Ids
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
				height: 500,
				}}>
					<Button variant="contained" color="success"	 href="/addClient" >Add Client</Button>
			<DataGrid
				rows={rows}
				loading= {loading}
				getRowId={getRowId}
				columns={columns()}
			
			/>
			</Paper>
		
	);
}
