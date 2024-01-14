import Link from 'next/link';

import EditNoteIcon from '@mui/icons-material/EditNote';
import { GridActionsCellItem } from '@mui/x-data-grid';
function EditButton({id}) {
    return (
       <Link href={`/editClient/${id}`}>
          <GridActionsCellItem
          icon={<EditNoteIcon />}
						label="Edit"
						className="textPrimary"
						color="inherit"
					/>
            </Link>
    );
}

export default EditButton;