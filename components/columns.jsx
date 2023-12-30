
import dayjs from 'dayjs';
import EditButton from './EditButton';
import RemoveClient from './RemoveClient';
export default function getColumns() {
	const columns = [
		{
			field: "principalApplicant",
			headerName: "Principal Applicant",
			width: 200,
			
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
			
			valueGetter: (params) => params.value && new Date(dayjs(params.value)),
		},
		{
			field: "caseType",
			headerName: "Case Type",
			width: 120,
			
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
				return	params.value.length > 1 ? params.value[params.value.length - 1].content : params.value.content;
				}
			},
		},
		{
			field: "interviewDate",
			headerName: "Interview Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(dayjs(params.value)),
		},
		{
			field: "biometricsDate",
			headerName: "Biometrics Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(dayjs(params.value)),
		},
		{
			field: "approvalDate",
			headerName: "Approval Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(dayjs(params.value)),
		},
		{
			field: "denialDate",
			headerName: "Denial Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(dayjs(params.value)),
		},
		{
			field: "caseClosingDate",
			headerName: "Case Closing Date",
			type: "date",
			width: 100,
			
			valueGetter: (params) => params.value && new Date(dayjs(params.value)),
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
