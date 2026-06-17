"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Box,
	Stack,
	Grid,
	Paper,
	Container,
	Typography,
	Divider,
	TextField,
	MenuItem,
	Button,
	CircularProgress,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];

const dateVal = (v) => (v ? dayjs(v) : null);

function SectionTitle({ children }) {
	return (
		<Grid item xs={12}>
			<Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
				{children}
			</Typography>
			<Divider sx={{ mt: 1 }} />
		</Grid>
	);
}

export default function EditClientForm({ id, client }) {
	const [formData, setFormData] = useState({ ...client });
	const [newNote, setNewNote] = useState({ content: "", date: "" });
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const setField = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));
	const setDate = (field) => (newValue) => setFormData((prev) => ({ ...prev, [field]: newValue }));

	const existingNotes = Array.isArray(formData.notes) ? formData.notes : [];

	const handleNewNoteChange = (e) => {
		setNewNote({ content: e.target.value, date: e.target.value ? new Date() : "" });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const newClient = { ...formData };
		newClient.notes = newNote.content !== "" ? [...existingNotes, newNote] : [...existingNotes];
		try {
			const res = await fetch(`/api/clients/${id}`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(newClient),
			});
			if (!res.ok) {
				throw new Error("Failed to edit client information");
			}
			router.push("/dashboard");
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		router.push("/dashboard");
	};

	return (
		<Container maxWidth="md" sx={{ py: 2 }}>
			<Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }} component="form" onSubmit={handleSubmit} autoComplete="off" noValidate>
				<Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
					Edit Client
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Grid container spacing={2}>
						<SectionTitle>Applicant Information</SectionTitle>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="principalApplicant" label="Principal Applicant"
								value={formData.principalApplicant || ""} onChange={setField("principalApplicant")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="contact" label="Contact"
								value={formData.contact || ""} onChange={setField("contact")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="country" label="Country" autoComplete="country"
								value={formData.country || ""} onChange={setField("country")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="caseSize" label="Case Size" type="number"
								value={formData.caseSize ?? ""} onChange={setField("caseSize")} />
						</Grid>

						<SectionTitle>Case Details</SectionTitle>
						<Grid item xs={12} sm={6} md={4}>
							<TextField select fullWidth name="caseType" label="Case Type"
								value={formData.caseType || ""} onChange={setField("caseType")}>
								{caseTypes.map((option) => (
									<MenuItem key={option} value={option}>{option}</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField select fullWidth name="pendingCase" label="Pending?"
								value={formData.pendingCase === false ? "no" : "yes"} onChange={setField("pendingCase")}>
								<MenuItem value="yes">Yes</MenuItem>
								<MenuItem value="no">No</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="receipt" label="Receipt"
								value={formData.receipt || ""} onChange={setField("receipt")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="caseStatus" label="Case Status"
								value={formData.caseStatus || ""} onChange={setField("caseStatus")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="lawyer" label="Lawyer"
								value={formData.lawyer || ""} onChange={setField("lawyer")} />
						</Grid>

						<SectionTitle>Key Dates</SectionTitle>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Application Date" slotProps={{ textField: { fullWidth: true } }}
								value={dateVal(formData.applicationDate)} onChange={setDate("applicationDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Interview Date" slotProps={{ textField: { fullWidth: true } }}
								value={dateVal(formData.interviewDate)} onChange={setDate("interviewDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Biometrics Date" slotProps={{ textField: { fullWidth: true } }}
								value={dateVal(formData.biometricsDate)} onChange={setDate("biometricsDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Approval Date" slotProps={{ textField: { fullWidth: true } }}
								value={dateVal(formData.approvalDate)} onChange={setDate("approvalDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Denial Date" slotProps={{ textField: { fullWidth: true } }}
								value={dateVal(formData.denialDate)} onChange={setDate("denialDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Case Closing Date" slotProps={{ textField: { fullWidth: true } }}
								value={dateVal(formData.caseClosingDate)} onChange={setDate("caseClosingDate")} />
						</Grid>

						<SectionTitle>Notes</SectionTitle>
						{existingNotes.length > 0 && (
							<Grid item xs={12}>
								<Stack spacing={1} sx={{ mb: 1 }}>
									{existingNotes.map((note, i) => (
										<Box key={i} sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
											<Typography variant="body2">{note.content}</Typography>
											{note.date && (
												<Typography variant="caption" color="text.secondary">
													{dayjs(note.date).format("MMM D, YYYY")}
												</Typography>
											)}
										</Box>
									))}
								</Stack>
							</Grid>
						)}
						<Grid item xs={12}>
							<TextField fullWidth name="notes" label="Add a Note" multiline minRows={2}
								value={newNote.content} onChange={handleNewNoteChange} />
						</Grid>
					</Grid>

					<Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
						<Button variant="outlined" color="inherit" onClick={handleCancel} disabled={loading}>
							Cancel
						</Button>
						<Button type="submit" variant="contained" color="primary" disabled={loading}
							startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}>
							{loading ? "Saving..." : "Save Changes"}
						</Button>
					</Stack>
				</LocalizationProvider>
			</Paper>
		</Container>
	);
}
