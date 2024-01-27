import EditClientForm from "@/components/EditClientForm";
import { Typography } from "@mui/material";

// get client by id
const getClientById = async ({ id }) => {
  try {
    const res = await fetch(process.env.NEXTAUTH_URL + `/api/clients/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to get client");
    }
    return res.json();

  } catch (error) {
    console.log(error);
  }
};

export default async function EditClient({ params }) {
  const { id } = params;
  const result = await getClientById({ id });
  if (result) {
    const { client } = result;
    return <EditClientForm id={id} client={client} />;
  }
  return <Typography variant="h1">Something went wrong</Typography>;
}
