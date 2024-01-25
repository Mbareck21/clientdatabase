import * as React from 'react';
import EditButton from './EditButton';
import RemoveClient from './RemoveClient';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from 'dayjs';
import clsx from 'clsx';
import WarningIcon from '@mui/icons-material/Warning';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingIcon from '@mui/icons-material/Pending';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Chip from '@mui/material/Chip';

export default function getColumns() {
	const caseTypes = ["Green Card", "Asylum", "EAD", "EAD Renewal", "CAM", "Citizenship Cert", "P-3", "I-730", "CAM-Reparole"];

	const helperFunction = (status) => {
		switch (status) {
			case "Denied":
				return <WarningIcon fontSize="small" color="danger" />
			case "Approved":
				return <DoneAllIcon fontSize="small" color="success" />
			case "Pending":
				return <PendingIcon fontSize="small" color="warning" />
			case "Applied":
				return <FolderOpenIcon fontSize="small" color="info" />
			default:
				return <PendingIcon fontSize="small" color="info" />
		}
	}



	const columns = [
		{
			field: "principalApplicant",
			headerName: "Principal Applicant",
			headerClassName: 'super-app-theme--header',
			width: 200,
			cellClassName: 'super-app-theme--cell',

		},
		{
			field: "contact",
			headerName: "Contact",
			headerClassName: 'super-app-theme--header',
			width: 100,

		},
		{
			field: "caseSize",
			headerName: "Case Size",
			headerClassName: 'super-app-theme--header',
			type: "number",
			width: 100,

		},
		{
			field: "country",
			headerName: "Country",
			type: "country",
			headerClassName: 'super-app-theme--header',
			width: 100,

		},
		{
			field: "pendingCase",
			headerName: "Pending Case",
			headerClassName: 'super-app-theme--header',
			type: "boolean",
			width: 100,
			renderCell: (params) => {
				return params.value === false ? <UnpublishedIcon color='warning' /> : <CheckCircleIcon color='success' />
			}

		},
		{
			field: "applicationDate",
			headerName: "Application Date",
			headerClassName: 'super-app-theme--header',
			type: "date",
			width: 100,

			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "caseType",
			headerName: "Case Type",
			headerClassName: 'super-app-theme--header',
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
			headerClassName: 'super-app-theme--header',
			width: 100,

		},
		{
			field: "caseStatus",
			headerName: "Case Status",
			headerClassName: 'super-app-theme--header',
			type: "text",
			width: 120,

			renderCell: (params) => {
				let color = 'default';

				if (params.value === 'Approved') {
					color = 'success';
				} else if (params.value === 'Denied') {
					color = 'error';
				} else if (params.value === 'Applied') {
					color = 'info';
				}

				return <Chip icon={helperFunction(params.value)} label={params.value} color={color} sx={{ width: 100 }} />
			}
		},
		{
			field: "lawyer",
			headerName: "Lawyer",
			headerClassName: 'super-app-theme--header',
			width: 100,

		},
		{
			field: "notes",
			headerName: "Notes",
			headerClassName: 'super-app-theme--header',
			width: 200,
			valueGetter: (params) => {
				if (params.value) {
					return params.value.length >= 1 ? params.value[params.value.length - 1].content : null;
				}
			},
		},
		{
			field: "interviewDate",
			headerName: "Interview Date",
			headerClassName: 'super-app-theme--header',
			type: "date",
			width: 100,

			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "biometricsDate",
			headerName: "Biometrics Date",
			headerClassName: 'super-app-theme--header',
			type: "date",
			width: 100,

			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "approvalDate",
			headerName: "Approval Date",
			headerClassName: 'super-app-theme--header',
			type: "date",
			width: 100,

			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "denialDate",
			headerName: "Denial Date",
			headerClassName: 'super-app-theme--header',
			type: "date",
			width: 100,

			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "caseClosingDate",
			headerName: "Case Closing Date",
			headerClassName: 'super-app-theme--header',
			type: "date",
			width: 100,

			valueGetter: (params) => params.value && new Date(params.value),
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			headerClassName: 'super-app-theme--header',
			width: "100",
			cellClassName: "actions",
			getActions: (params) => {
				const { id } = params
				return [
					<EditButton key={id} id={id} />,
					<RemoveClient key={id} id={id} />
				];
			},

		},
	];
	return columns;
}
