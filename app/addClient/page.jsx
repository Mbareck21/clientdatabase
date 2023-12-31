"use client";
import React, { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox'; 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
	const handleCancel = (e) => {
		e.preventDefault();	
    	router.push("/");
  }
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>

			<Box sx={{ p: 2 ,border: '1px dashed grey'}}
			component="form"
			
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
			 <DatePicker
          label="Application Date"
          type="date"
          value={applicationDate} 
          onChange={(newValue) => setApplicationDate(newValue)} 
        />
			<Select
          name="caseType"
          label="Case Type"
          value={caseType || ""} 
          onChange={(e) => setCaseType(e.target.value)}
        >
          <MenuItem value="">Select a case type</MenuItem>
          <MenuItem value="Asylum">Asylum</MenuItem>
          <MenuItem value="Green Card">Green Card</MenuItem>
          <MenuItem value="EAD">EAD</MenuItem>
        </Select>
			<TextField
				name="receipt"
				label="Receipt"
				value={receipt} // bind state value
				onChange={(e) => setReceipt(e.target.value)} // update state on change
			/>
			<TextField
				name="caseStatus"
				label="Case Status"
				value={caseStatus} // bind state value
				onChange={(e) => setCaseStatus(e.target.value)} // update state on change
			/>
			<TextField
				name="lawyer"
				label="Lawyer"
				value={lawyer} // bind state value
				onChange={(e) => setLawyer(e.target.value)} // update state on change
			/>
			<TextField
				name="notes"
				label="Notes"
				multiline
				
				value={notes.content} // bind state value
				onChange={(e) =>
					setNotes({ content: e.target.value,  date: e.target.value ? new Date() : notes.date})
				} // update state on change
			/>
			<DatePicker
          label="Interview Date"
          type="date"
          value={interviewDate} 
          onChange={(newValue) => setInterviewDate(newValue)} 
        />
			<DatePicker
          label="Biometrics Date"
          type="date"
          value={biometricsDate} 
          onChange={(newValue) => setBiometricsDate(newValue)} 
        />
			 <DatePicker
          label="Approval Date"
          type="date"
          value={approvalDate || ""} 
          onChange={(newValue) => setApprovalDate(newValue)} 
        />
        <DatePicker
          label="denialDate"
          value={denialDate || ""}
          onChange={(newValue) => setDenialDate(newValue)}
        />
        <DatePicker
          label="caseClosingDate"
          value={caseClosingDate || ""}
          onChange={(newValue) => setCaseClosingDate(newValue)}
        />
			<Button type="submit" variant="contained" color="primary">
				Submit
			</Button>
			<Button variant="contained" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
		</Box>
		</LocalizationProvider>
	);
}
