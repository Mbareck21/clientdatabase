"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];

export default function EditClientForm({ id, client }) {

	const [formData, setFormData] = useState({ ...client });
	const [newNote, setNewNote] = useState({ content: "", date: "" });

	const handleNewNoteChange = (e) => {
		setNewNote({ content: e.target.value && e.target.value, date: e.target.value && new Date() });
	}

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newClient = {
			...formData,

		};
		newClient.notes = newNote.content !== "" ? [...formData.notes, newNote] : [...formData.notes];
		try {
			const res = await fetch(`/api/clients/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(newClient),
			});
			console.log(newClient);
			if (!res.ok) {
				throw new Error("Failed to edit client information");
			}
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	const handleCancel = async (e) => {
		e.preventDefault();
		router.push("/");
	}
	return (
		<Box
			component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '25ch' },
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<LocalizationProvider dateAdapter={AdapterDayjs} >
				<TextField
					name="principalApplicant"
					label="Principal Applicant"
					required
					value={formData.principalApplicant}
					onChange={(e) => setFormData({
						...formData,
						principalApplicant: e.target.value
					})}
				/>
				<TextField
					name="contact"
					label="Contact"
					required
					value={formData.contact}
					onChange={(e) => setFormData({
						...formData,
						contact: e.target.value
					})}
				/>
				<TextField
					name="caseSize"
					label="Case Size"
					type="number"
					autoComplete="off"
					required
					value={formData.caseSize}
					onChange={(e) => setFormData({
						...formData,
						caseSize: e.target.value
					})}
				/>
				<TextField
					name="country"
					label="Country"
					required
					autoComplete="country"
					value={formData.country}
					onChange={(e) => setFormData({
						...formData,
						country: e.target.value
					})}
				/>

				<TextField
					select
					label="Pending ?"
					name="pendingCase"
					type="boolean"
					id="pending-case"
					value={formData.pendingCase === false ? "no" : "yes"}
					onChange={(e) => setFormData({
						...formData,
						pendingCase: e.target.value
					})}
				>
					<MenuItem value="yes">Yes</MenuItem>
					<MenuItem value="no">No</MenuItem>
				</TextField>

				<DatePicker
					label="Application Date"
					type="date"
					value={dayjs(formData.applicationDate)}
					onChange={(newValue) => setFormData({
						...formData,
						applicationDate: newValue
					})}
				/>
				<TextField
					select
					label="Case Type"
					name="CaseType"
					id=""
					value={formData.caseType}
					onChange={(e) => setFormData({
						...formData,
						caseType: e.target.value
					})}
				>
					{caseTypes.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
				<TextField
					name="receipt"
					label="Receipt"
					value={formData.receipt}
					onChange={(e) => setFormData({
						...formData,
						receipt: e.target.value
					})}
				/>
				<TextField
					name="caseStatus"
					label="Case Status"
					value={formData.caseStatus}
					onChange={(e) => setFormData({
						...formData,
						caseStatus: e.target.value
					})}
				/>
				<TextField
					name="lawyer"
					label="Lawyer"
					value={formData.lawyer}
					onChange={(e) => setFormData({
						...formData,
						lawyer: e.target.value
					})}
				/>
				<TextField
					name="notes"
					label="Notes"
					value={newNote.content}
					onChange={handleNewNoteChange}

				/>

				<DatePicker
					label="Interview Date"
					type="date"
					value={dayjs(formData.interviewDate)}
					onChange={(newValue) => setFormData({
						...formData,
						interviewDate: newValue
					})}
				/>
				<DatePicker
					label="Biometrics Date"
					type="date"
					value={dayjs(formData.biometricsDate)}
					onChange={(newValue) => setFormData({
						...formData,
						biometricsDate: newValue
					})}
				/>
				<DatePicker
					label="Approval Date"
					type="date"
					value={dayjs(formData.approvalDate)}
					onChange={(newValue) => setFormData({
						...formData,
						approvalDate: newValue
					})}
				/>
				<DatePicker
					label="denialDate"
					value={dayjs(formData.denialDate)}
					onChange={(newValue) => setFormData({
						...formData,
						denialDate: newValue
					})}
				/>
				<DatePicker
					label="caseClosingDate"
					value={dayjs(formData.caseClosingDate)}
					onChange={(newValue) => setFormData({
						...formData,
						caseClosingDate: newValue
					})}
				/>
				<Stack direction="row" spacing={2} justifyContent="flex-end">

					<Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
						Submit
					</Button>
					<Button variant="contained" color="secondary" onClick={handleCancel}>
						Cancel
					</Button>
				</Stack>
			</LocalizationProvider>
		</Box>
	);
}
