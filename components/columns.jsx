
import dayjs from 'dayjs';
import EditButton from './EditButton';
import RemoveClient from './RemoveClient';
import clsx from 'clsx';
export default function getColumns() {
	const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];



	const columns = [
		{
			field: "principalApplicant",
			headerName: "Principal Applicant",
			width: 200,
			cellClassName: 'super-app-theme--cell',
			
		},
		{
			field: "contact",
			headerName: "Contact",
			width: 100,
			
		},
		{
			field: "caseSize",
			headerName: "Case Size",
			type: "number",
			width: 100,
			
		},
		{
			field: "country",
			headerName: "Country",
			width: 100,
			
		},
		{
			field: "pendingCase",
			headerName: "Pending Case",
			type: "boolean",
			width: 100,
		},
		{
			field: "applicationDate",
			headerName: "Application Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "caseType",
			headerName: "Case Type",
			width: 120,
			cellClassName: (params) => {
				if (params.value == null) {
					return '';
				}

				return clsx('super-app', {
					'gc': params.value === 'Green Card',
					'as': params.value === 'Asylum',
					'ad': params.value === 'EAD',
					'adr': params.value === 'EAD Renewal',
					'ca': params.value === 'CAM',
					'cc': params.value === 'Citizenship Cert',
					'c': params.value === 'Citizenship',
					'p': params.value === 'P-3',
					'i': params.value === 'I-730',
					'car': params.value === 'CAM-Reparole',
				})

			},
		},
		{
			field: "receipt",
			headerName: "Receipt",
			width: 100,
			
		},
		{
			field: "caseStatus",
			headerName: "Case Status",
			type: "text",
			width: 100,
			
		},
		{
			field: "lawyer",
			headerName: "Lawyer",
			width: 100,
			
		},
		{
			field: "notes",
			headerName: "Notes",
			width: 200,
			valueGetter: (params) => {
				if (params.value) {
				return	params.value.length >= 1 ? params.value[params.value.length - 1].content :null;
				}
			},
		},
		{
			field: "interviewDate",
			headerName: "Interview Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "biometricsDate",
			headerName: "Biometrics Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "approvalDate",
			headerName: "Approval Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "denialDate",
			headerName: "Denial Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "caseClosingDate",
			headerName: "Case Closing Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: "100",
			cellClassName: "actions",
			getActions: ({ id }) => {
				return [
					
					<EditButton id={id} />,
					<RemoveClient id={id}/>
				
				];
			},
		},
	];
	return columns;
}
