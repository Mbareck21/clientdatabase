"use client";
import React, { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from "next/navigation";
import {
	Form,
	TextField,
	Checkbox,
	Select,
	MenuItem,
	Button,
	Box,
} from "@mui/material";

export default function AddClientForm() {
	const [principalApplicant, setPrincipalApplicant] = useState("");
	const [contact, setContact] = useState("");
	const [caseSize, setCaseSize] = useState("");
	const [country, setCountry] = useState("");
	const [pendingCase, setPendingCase] = useState("");
	const [applicationDate, setApplicationDate] = useState("");
	const [caseType, setCaseType] = useState("");
	const [receipt, setReceipt] = useState("");
	const [caseStatus, setCaseStatus] = useState("");
	const [lawyer, setLawyer] = useState("");
	const [notes, setNotes] = useState({ content: "", date: "" });
	const [interviewDate, setInterviewDate] = useState("");
	const [biometricsDate, setBiometricsDate] = useState("");
	const [approvalDate, setApprovalDate] = useState("");
	const [denialDate, setDenialDate] = useState("");
	const [caseClosingDate, setCaseClosingDate] = useState("");

	// console.log(client);
	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();

		// newClient.notes = [...client.notes, notes];
		try {
			const res = await fetch("http://localhost:3000/api/clients", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					principalApplicant,
					contact,
					caseSize,
					country,
					pendingCase,
					applicationDate,
					caseType,
					receipt,
					caseStatus,
					lawyer,
					notes,
					interviewDate,
					biometricsDate,
					approvalDate,
					denialDate,
					caseClosingDate,
				}),
			});
			// console.log(JSON.stringify({ newClient }));
			if (!res.ok) {
				throw new Error("Failed to edit client information");
			}
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Box
			component="form"
			className="grid grid-cols-3 grid-rows-2 gap-1 "
			onSubmit={handleSubmit}>
			<TextField
				name="principalApplicant"
				label="Principal Applicant"
				required
				value={principalApplicant}
				onChange={(e) => setPrincipalApplicant(e.target.value)}
			/>
			<TextField
				name="contact"
				label="Contact"
				required
				value={contact} // bind state value
				onChange={(e) => setContact(e.target.value)} // update state on change
			/>
			<TextField
				name="caseSize"
				label="Case Size"
				type="number"
				required
				value={caseSize} // bind state value
				onChange={(e) => setCaseSize(e.target.value)} // update state on change
			/>
			<TextField
				name="country"
				label="Country"
				required
				value={country} // bind state value
				onChange={(e) => setCountry(e.target.value)} // update state on change
			/>
			<Checkbox
				name="pendingCase"
				label="Pending Case"
				value={pendingCase} // bind state value
				onChange={(e) => setPendingCase(e.target.checked)} // update state on change
			/>
			<TextField
				name="applicationDate"
				label="Application Date"
				type="date"
				required
				value={applicationDate} // bind state value
				onChange={(e) => setApplicationDate(e.target.value)} // update state on change
			/>
			<Select
				name="caseType"
				label="Case Type"
				value={caseType} // bind state value
				onChange={(e) => setCaseType(e.target.value)}>
				<MenuItem value="">Select a case type</MenuItem>
				<MenuItem value="Asylum">Asylum</MenuItem>
				<MenuItem value="Green Card">Green Card</MenuItem>
				<MenuItem value="EAD">EAD</MenuItem>
			</Select>
			<TextField
				name="receipt"
				label="Receipt"
				required
				value={receipt} // bind state value
				onChange={(e) => setReceipt(e.target.value)} // update state on change
			/>
			<TextField
				name="caseStatus"
				label="Case Status"
				required
				value={caseStatus} // bind state value
				onChange={(e) => setCaseStatus(e.target.value)} // update state on change
			/>
			<TextField
				name="lawyer"
				label="Lawyer"
				required
				value={lawyer} // bind state value
				onChange={(e) => setLawyer(e.target.value)} // update state on change
			/>
			<TextField
				name="notes"
				label="Notes"
				multiline
				rows={4}
				value={notes.content} // bind state value
				onChange={(e) =>
					setNotes({ content: e.target.value, date: new Date() })
				} // update state on change
			/>
			<TextField
				name="interviewDate"
				label="Interview Date"
				type="date"
				value={interviewDate} // bind state value
				onChange={(e) => setInterviewDate(e.target.value)} // update state on change
			/>
			<TextField
				name="biometricsDate"
				label="Biometrics Date"
				type="date"
				value={biometricsDate} // bind state value
				onChange={(e) => setBiometricsDate(e.target.value)} // update state on change
			/>
			<TextField
				name="approvalDate"
				label="Approval Date"
				type="date"
				value={approvalDate} // bind state value
				onChange={(e) => setApprovalDate(e.target.value)} // update state on change
			/>
			<TextField
				name="denialDate"
				label="Denial Date"
				type="date"
				value={denialDate} // bind state value
				onChange={(e) => setDenialDate(e.target.value)} // update state on change
			/>
			<TextField
				name="caseClosingDate"
				label="Case Closing Date"
				type="date"
				value={caseClosingDate} // bind state value
				onChange={(e) => setCaseClosingDate(e.target.value)} // update state on change
			/>
			<Button type="submit" variant="contained" color="primary">
				Submit
			</Button>
		</Box>
	);
}
