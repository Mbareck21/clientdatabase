import WarningIcon from '@mui/icons-material/Warning';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingIcon from '@mui/icons-material/Pending';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Chip from '@mui/material/Chip';
import * as React from 'react';

export default function CaseStatus({ status }) {

    const helperFunction = (status) => {
        switch (status) {
            case "Denied":
                return <WarningIcon fontSize="small" color="error" />
            case "Approved":
                return <DoneAllIcon fontSize="small" color="success" />
            case "Pending":
                return <PendingIcon fontSize="small" color="warning" />
            case "Applied":
                return <FolderOpenIcon fontSize="small" color="info" />
            default:
                return <PendingIcon fontSize="small" color="warning" />
        }

    }
    const statusColor = (status) => {
        switch (status) {
            case "Denied":
                return "error"
            case "Approved":
                return "success"
            case "Pending":
                return "danger"
            case "Applied":
                return "info"
            default:
                return "warning"
        }
    }

    return <Chip label={status} icon={helperFunction(status)} sx={{ color: statusColor(status) }} />

}