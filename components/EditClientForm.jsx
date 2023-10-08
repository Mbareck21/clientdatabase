import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Form,
	TextField,
	Checkbox,
	Select,
	MenuItem,
	Button,
} from "@mui/material";

export default function EditClientForm({ id, client }) {
	const [principalApplicant, setPrincipalApplicant] = useState(
		client.principalApplicant
	);
	const [contact, setContact] = useState(client.contact || "");
	const [caseSize, setCaseSize] = useState(client.caseSize || "");
	const [country, setCountry] = useState(client.country || "");
	const [pendingCase, setPendingCase] = useState(client.pendingCase || "");
	const [applicationDate, setApplicationDate] = useState(
		client.applicationDate || ""
	);
	const [caseType, setCaseType] = useState(client.caseType || "");
	const [receipt, setReceipt] = useState(client.receipt || "");
	const [caseStatus, setCaseStatus] = useState(client.caseStatus || "");
	const [lawyer, setLawyer] = useState(client.lawyer || "");
	const [notes, setNotes] = useState({ content: "", date: "" });
	const [interviewDate, setInterviewDate] = useState(
		client.interviewDate || ""
	);
	const [biometricsDate, setBiometricsDate] = useState(
		client.biometricsDate || ""
	);
	const [approvalDate, setApprovalDate] = useState(client.approvalDate || "");
	const [denialDate, setDenialDate] = useState(client.denialDate || "");
	const [caseClosingDate, setCaseClosingDate] = useState(
		client.caseClosingDate || ""
	);

	// console.log(client);
	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();
		const newClient = {
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
		};
		newClient.notes = [...client.notes, notes];
		try {
			const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(newClient),
			});
			// console.log(JSON.stringify({ clientState }));
			if (!res.ok) {
				throw new Error("Failed to edit client information");
			}
			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Form
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
				onChange={(e) => setNotes({ ...notes, content: e.target.value })} // update state on change
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
		</Form>
	);
}
