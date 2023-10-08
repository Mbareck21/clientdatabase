import dayjs from "dayjs";


export default function getColumns() {
	const columns = [
		{
			field: "principalApplicant",
			headerName: "Principal Applicant",
			width: 200,
			editable: true,
		},
		{
			field: "contact",
			headerName: "Contact",
			width: 150,
			editable: true,
		},
		{
			field: "caseSize",
			headerName: "Case Size",
			type: "number",
			width: 100,
			editable: true,
		},
		{
			field: "country",
			headerName: "Country",
			width: 150,
			editable: true,
		},
		{
			field: "pendingCase",
			headerName: "Pending Case",
			type: "boolean",
			width: 150,
			editable: true,
		},
		{
			field: "applicationDate",
			headerName: "Application Date",
			type: "date",
			width: 150,
			editable: true,
			valueGetter: (params) => new Date(params.value),
		},
		{
			field: "caseType",
			headerName: "Case Type",
			width: 150,
			editable: true,
		},
		{
			field: "receipt",
			headerName: "Receipt",
			width: 150,
			editable: true,
		},
		{
			field: "caseStatus",
			headerName: "Case Status",
			width: 150,
			editable: true,
		},
		{
			field: "lawyer",
			headerName: "Lawyer",
			width: 150,
			editable: true,
		},
		{
			field: "notes",
			headerName: "Notes",
			width: 200,
			editable: true,
		},
		{
			field: "interviewDate",
			headerName: "Interview Date",
			type: "date",
			width: 150,
			editable: true,
			valueGetter: (params) => new Date(params.value),
		},
		{
			field: "biometricsDate",
			headerName: "Biometrics Date",
			type: "date",
			width: 150,
			editable: true,
			valueGetter: (params) => new Date(params.value),
		},
		{
			field: "approvalDate",
			headerName: "Approval Date",
			type: "date",
			width: 150,
			editable: true,
			valueGetter: (params) => new Date(params.value),
		},
		{
			field: "denialDate",
			headerName: "Denial Date",
			type: "date",
			width: 150,
			editable: true,
			valueGetter: (params) => new Date(params.value),
		},
		{
			field: "caseClosingDate",
			headerName: "Case Closing Date",
			type: "date",
			width: 150,
			editable: true,
			valueGetter: (params) => new Date(params.value),
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: "100",
			cellClassName: "actions",
			getActions: (params) => {
				const isInEditMode =
					rowModesModel[params.id]?.mode === GridRowModes.Edit;
				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{ color: "primary.main" }}
							onClick={handleSaveClick(params.id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(params.id)}
							color="inherit"
						/>,
					];
				}
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(params.id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(params.id)}
						color="inherit"
					/>,
				];
			},
		},
	];
	return columns;
}
