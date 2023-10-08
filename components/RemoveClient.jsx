"use client";
import DeleteIcon from '@mui/icons-material/Delete';
import {

  GridActionsCellItem,
} from '@mui/x-data-grid';
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const removeClient = async () => {
 const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/clients?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };


  return (
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={removeClient}
            color="inherit"
          />
  );
}