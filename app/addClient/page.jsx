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
import { FormControl, InputLabel } from "@mui/material";

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
					caseClosingDate: "",});

const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];


	const router = useRouter();
	const handleSubmit = async (event) => {
		event.preventDefault();
const newClient = {...formData, notes: formData.notes.content !== "" ? [formData.notes]: []};

	console.log(newClient);
		
		try {
			const res = await fetch("http://localhost:3000/api/clients", {
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
    	router.push("/");
  }
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>

			<Box sx={{ p: 2 ,border: '1px dashed grey', '& .MuiTextField-root': { m: 1, width: '25ch' },}}
			component="form"			
			onSubmit={handleSubmit}>
			<TextField
				name="principalApplicant"
				label="Principal Applicant"
				required
				value={formData.principalApplicant}
					onChange={(e) => setFormData({
						...formData,
						principalApplicant:e.target.value
					})}
			/>
			<TextField
				name="contact"
				label="Contact"
				required
				value={formData.contact} // bind state value
				onChange={(e) => setFormData({
						...formData,
						contact:e.target.value
					})} // update state on change
			/>
			<TextField
				name="caseSize"
				label="Case Size"
				type="number"
				required
				value={formData.caseSize} // bind state value
				onChange={(e) => setFormData({
						...formData,
						caseSize:e.target.value
					})} // update state on change
			/>
			<TextField
				name="country"
				label="Country"
				required
				value={formData.country} // bind state value
				onChange={(e) => setFormData({
						...formData,
						country:e.target.value
					})}// update state on change
			/>
			
				<TextField
				select
					label="Pending ?"
					name="pendingCase"
					type="boolean"
					
					value={formData.pendingCase} 
					onChange={(e) => setFormData({
						...formData,
						pendingCase:e.target.value
					})}
				>
					<MenuItem value="yes">Yes</MenuItem>
					<MenuItem value="no">No</MenuItem>
				</TextField>

			 <DatePicker
          label="Application Date"
          type="date"
          value={formData.applicationDate} 
					onChange={(newValue) => setFormData({
						...formData,
						applicationDate:newValue
		  })} 
        />
			<TextField
				select
					label="Case Type"
					name="caseType"
					required
					value={formData. caseType}
					onChange={(e) => setFormData({
						...formData,
						caseType:e.target.value
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
				value={formData.receipt} // bind state value
				onChange={(e) => setFormData({
						...formData,
						receipt:e.target.value
					})} // update state on change
			/>
			<TextField
				name="caseStatus"
				label="Case Status"
				value={formData.caseStatus} // bind state value
				onChange={(e) => setFormData({
						...formData,
						caseStatus:e.target.value
					})} // update state on change
			/>
			<TextField
				name="lawyer"
				label="Lawyer"
				value={formData.lawyer} // bind state value
				onChange={(e) => setFormData({
						...formData,
						lawyer:e.target.value
					})} // update state on change
			/>
			<TextField
				name="notes"
				label="Notes"
				multiline
				
				value={formData.notes.content} // bind state value
				onChange={(e) =>
					setFormData({
						...formData,
						notes: { content: e.target.value && e.target.value,  date: e.target.value && new Date()},
					})
				} // update state on change
			/>
			<DatePicker
          label="Interview Date"
          type="date"
          value={formData.interviewDate} 
          onChange={(newValue) => setFormData({
						...formData,
						interviewDate:newValue
		  })} 
        />
			<DatePicker
          label="Biometrics Date"
          type="date"
          value={formData.biometricsDate} 
          onChange={(newValue) => setFormData({
						...formData,
						biometricsDate:newValue
		  })}  
        />
			 <DatePicker
          label="Approval Date"
          type="date"
          value={formData.approvalDate || ""} 
          onChange={(newValue) => setFormData({
						...formData,
						approvalDate:newValue
		  })}
        />
        <DatePicker
          label="denialDate"
          value={formData.denialDate || ""}
          onChange={(newValue) => setFormData({
						...formData,
						denialDate:newValue
		  })}
        />
        <DatePicker
          label="caseClosingDate"
          value={formData.caseClosingDate || ""}
           onChange={(newValue) => setFormData({
						...formData,
						caseClosingDate:newValue
		  })}
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
