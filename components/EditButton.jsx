import Link from '@mui/material/Link';

import EditIcon from '@mui/icons-material/Edit';
import {

  GridActionsCellItem,
} from '@mui/x-data-grid';
function EditButton({id}) {
    return (
       <Link href={`/editClient/${id}`}>
          <GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						color="inherit"
					/>
            </Link>
    );
}

export default EditButton;