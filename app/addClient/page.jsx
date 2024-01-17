"use client";
import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/material/';


export default function AddClientForm() {
	const [formData, setFormData] = useState({
		principalApplicant: "",
		contact: "",
		caseSize: "",
		country: "",
		pendingCase: "no",
		applicationDate: "",
		caseType: "",
		receipt: "",
		caseStatus: "",
		lawyer: "",
		notes: { content: "", date: "" },
		interviewDate: "",
		biometricsDate: "",
		approvalDate: "",
		denialDate: "",
		caseClosingDate: "",
	});

	const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];


	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const newClient = { ...formData, notes: formData.notes.content !== "" ? [formData.notes] : [] };

		try {
			const res = await fetch("/api/clients", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(newClient),
			});
			if (!res.ok) {
				throw new Error("Failed to create client information");
			}
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	const handleCancel = (e) => {
		e.preventDefault();
		router.push("/dashboard");
	}
	return (

		<Box component="form"
			sx={{
				'& > :not(style)': { m: 1, width: '25ch' },
			}}
			autoComplete="off"
			onSubmit={handleSubmit}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<TextField
					name="principalApplicant"
					label="Principal Applicant"
					required
					id="principal-Applicant"
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
					id="contact"
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
					id="case-Size"
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

					value={formData.pendingCase}
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
					id="application-Date"
					value={formData.applicationDate}
					onChange={(newValue) => setFormData({
						...formData,
						applicationDate: newValue
					})}
				/>
				<TextField
					select
					label="Case Type"
					name="caseType"
					required
					id="case-Type"
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
					id="receipt"
					value={formData.receipt}
					onChange={(e) => setFormData({
						...formData,
						receipt: e.target.value
					})}
				/>
				<TextField
					name="caseStatus"
					label="Case Status"
					id="case-Status"
					value={formData.caseStatus}
					onChange={(e) => setFormData({
						...formData,
						caseStatus: e.target.value
					})}
				/>
				<TextField
					name="lawyer"
					label="Lawyer"
					id="lawyer"
					value={formData.lawyer}
					onChange={(e) => setFormData({
						...formData,
						lawyer: e.target.value
					})}
				/>
				<TextField
					name="notes"
					label="Notes"
					multiline
					id="case-notes"
					value={formData.notes.content}
					onChange={(e) =>
						setFormData({
							...formData,
							notes: { content: e.target.value && e.target.value, date: e.target.value && new Date() },
						})
					}
				/>
				<DatePicker
					label="Interview Date"
					type="date"
					id="interview-Date"
					value={formData.interviewDate}
					onChange={(newValue) => setFormData({
						...formData,
						interviewDate: newValue
					})}
				/>
				<DatePicker
					label="Biometrics Date"
					id="biometrics-Date"
					type="date"
					value={formData.biometricsDate}
					onChange={(newValue) => setFormData({
						...formData,
						biometricsDate: newValue
					})}
				/>
				<DatePicker
					label="Approval Date"
					id="approval-Date"
					type="date"
					value={formData.approvalDate || ""}
					onChange={(newValue) => setFormData({
						...formData,
						approvalDate: newValue
					})}
				/>
				<DatePicker
					label="denialDate"
					id="denial-Date"
					name="denialDate"
					value={formData.denialDate || ""}
					onChange={(newValue) => setFormData({
						...formData,
						denialDate: newValue
					})}
				/>
				<DatePicker
					label="caseClosingDate"
					id="case-Closing-Date"
					name="caseClosingDate"
					value={formData.caseClosingDate || ""}
					onChange={(newValue) => setFormData({
						...formData,
						caseClosingDate: newValue
					})}
				/>
				<Stack direction="row" spacing={2} justifyContent="flex-end">

					<Button type="submit" variant="contained" color="primary" >
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
