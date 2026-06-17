"use client";
import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from "next/navigation";
import {
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

const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];

function SectionTitle({ children }) {
	return (
		<>
			<Grid item xs={12}>
				<Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
					{children}
				</Typography>
				<Divider sx={{ mt: 1 }} />
			</Grid>
		</>
	);
}

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
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const setField = (field) => (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));
	const setDate = (field) => (newValue) => setFormData((prev) => ({ ...prev, [field]: newValue }));

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const newClient = { ...formData, notes: formData.notes.content !== "" ? [formData.notes] : [] };

		try {
			const res = await fetch("/api/clients", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(newClient),
			});
			if (!res.ok) {
				throw new Error("Failed to create client information");
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
			<Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }} component="form" onSubmit={handleSubmit} autoComplete="off">
				<Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
					Add New Client
				</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Grid container spacing={2}>
						<SectionTitle>Applicant Information</SectionTitle>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="principalApplicant" label="Principal Applicant" required
								value={formData.principalApplicant} onChange={setField("principalApplicant")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="contact" label="Contact" required
								value={formData.contact} onChange={setField("contact")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="country" label="Country" required
								value={formData.country} onChange={setField("country")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="caseSize" label="Case Size" type="number" required
								value={formData.caseSize} onChange={setField("caseSize")} />
						</Grid>

						<SectionTitle>Case Details</SectionTitle>
						<Grid item xs={12} sm={6} md={4}>
							<TextField select fullWidth name="caseType" label="Case Type" required
								value={formData.caseType} onChange={setField("caseType")}>
								{caseTypes.map((option) => (
									<MenuItem key={option} value={option}>{option}</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField select fullWidth name="pendingCase" label="Pending?"
								value={formData.pendingCase} onChange={setField("pendingCase")}>
								<MenuItem value="yes">Yes</MenuItem>
								<MenuItem value="no">No</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="receipt" label="Receipt"
								value={formData.receipt} onChange={setField("receipt")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="caseStatus" label="Case Status"
								value={formData.caseStatus} onChange={setField("caseStatus")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<TextField fullWidth name="lawyer" label="Lawyer"
								value={formData.lawyer} onChange={setField("lawyer")} />
						</Grid>

						<SectionTitle>Key Dates</SectionTitle>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Application Date" slotProps={{ textField: { fullWidth: true } }}
								value={formData.applicationDate || null} onChange={setDate("applicationDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Interview Date" slotProps={{ textField: { fullWidth: true } }}
								value={formData.interviewDate || null} onChange={setDate("interviewDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Biometrics Date" slotProps={{ textField: { fullWidth: true } }}
								value={formData.biometricsDate || null} onChange={setDate("biometricsDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Approval Date" slotProps={{ textField: { fullWidth: true } }}
								value={formData.approvalDate || null} onChange={setDate("approvalDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Denial Date" slotProps={{ textField: { fullWidth: true } }}
								value={formData.denialDate || null} onChange={setDate("denialDate")} />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker label="Case Closing Date" slotProps={{ textField: { fullWidth: true } }}
								value={formData.caseClosingDate || null} onChange={setDate("caseClosingDate")} />
						</Grid>

						<SectionTitle>Notes</SectionTitle>
						<Grid item xs={12}>
							<TextField fullWidth name="notes" label="Notes" multiline minRows={3}
								value={formData.notes.content}
								onChange={(e) => setFormData((prev) => ({
									...prev,
									notes: { content: e.target.value, date: e.target.value ? new Date() : "" },
								}))} />
						</Grid>
					</Grid>

					<Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
						<Button variant="outlined" color="inherit" onClick={handleCancel} disabled={loading}>
							Cancel
						</Button>
						<Button type="submit" variant="contained" color="primary" disabled={loading}
							startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}>
							{loading ? "Saving..." : "Add Client"}
						</Button>
					</Stack>
				</LocalizationProvider>
			</Paper>
		</Container>
	);
}
