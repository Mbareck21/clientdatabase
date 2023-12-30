"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function EditClientForm({ id, client }) {
  const [principalApplicant, setPrincipalApplicant] = useState(
    client.principalApplicant
  );
  const [contact, setContact] = useState(client.contact || "");
  const [caseSize, setCaseSize] = useState(client.caseSize || "");
  const [country, setCountry] = useState(client.country || "");
  const [pendingCase, setPendingCase] = useState(client.pendingCase || false) ;
  const [applicationDate, setApplicationDate] = useState(
    client.applicationDate || ""
  );
  const [caseType, setCaseType] = useState(client.caseType || "");
  const [receipt, setReceipt] = useState(client.receipt || "");
  const [caseStatus, setCaseStatus] = useState(client.caseStatus || "");
  const [lawyer, setLawyer] = useState(client.lawyer || "");
  const [notes, setNotes] = useState({ content: null, date: null });
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
    newClient.notes = notes.content !== null ? [...client.notes,  notes]:client.notes;
    try {
      const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      console.log(JSON.stringify(newClient));
      if (!res.ok) {
        throw new Error("Failed to edit client information");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = async(e) => {
    e.preventDefault();
    router.push("/");
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box
      component="form"
      className="grid grid-cols-3 grid-rows-2 gap-1 "
      onSubmit={handleSubmit}
    >
        <TextField
          name="principalApplicant"
          label="Principal Applicant"
          value={principalApplicant}
          onChange={(e) => setPrincipalApplicant(e.target.value)}
        />
        <TextField
          name="contact"
          label="Contact"
          value={contact} 
          onChange={(e) => setContact(e.target.value)} 
        />
        <TextField
          name="caseSize"
          label="Case Size"
          type="number"
          value={caseSize} 
          onChange={(e) => setCaseSize(e.target.value)} 
        />
        <TextField
          name="country"
          label="Country"
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
        />
        <Checkbox
          name="pendingCase"
          label="Pending Case"
          checked={pendingCase === true ? true : false}
          onChange={(e) => setPendingCase(e.target.checked)} 
        />
        <DatePicker
          label="Application Date"
          type="date"
          value={dayjs(applicationDate)} 
          onChange={(newValue) => setApplicationDate(newValue)} 
        />
        <Select
          name="caseType"
          label="Case Type"
          value={caseType} 
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
          value={receipt} 
          onChange={(e) => setReceipt(e.target.value)} 
        />
        <TextField
          name="caseStatus"
          label="Case Status"
          value={caseStatus} 
          onChange={(e) => setCaseStatus(e.target.value)} 
        />
        <TextField
          name="lawyer"
          label="Lawyer"
          value={lawyer} 
          onChange={(e) => setLawyer(e.target.value)} 
        />
        <TextField
          name="notes"
          label="Notes"
          multiline
          rows={1}
          value={notes.content} 
          onChange={(e) => setNotes({
  ...notes,
  // If the value is null, use an empty string as the content
  content: e.target.value || "",
  // If the value is null, use the current date as the date
  date: e.target.value ? new Date() : notes.date
})} 
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
          value={dayjs(biometricsDate)} 
          onChange={(newValue) => setBiometricsDate(newValue)} 
        />
        <DatePicker
          label="Approval Date"
          type="date"
          value={dayjs(approvalDate)} 
          onChange={(newValue) => setApprovalDate(newValue)} 
        />
        <DatePicker
          label="denialDate"
          value={dayjs(denialDate)}
          onChange={(newValue) => setDenialDate(newValue)}
        />
        <DatePicker
          label="caseClosingDate"
          value={dayjs(caseClosingDate)}
          onChange={(newValue) => setCaseClosingDate(newValue)}
        />
		  
      <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="contained" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
		  </LocalizationProvider>
  );
}
