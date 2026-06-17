import EditClientForm from "@/components/EditClientForm";
import { Typography } from "@mui/material";
import connectMongoDB from "@/lib/mongodb";
import Client from "@/models/client";
import mongoose from "mongoose";

// Read the client directly from the database. Doing the query here (instead of
// fetching the now-protected /api/clients/[id] route) avoids the server-side
// fetch dropping the session cookie. Page access is gated by middleware.
const getClientById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    await connectMongoDB();
    const client = await Client.findById(id).lean();
    if (!client) return null;
    // Serialize for the client component (ObjectId / Date -> plain values).
    return JSON.parse(JSON.stringify(client));
  } catch (error) {
    console.error("Failed to load client:", error.message);
    return null;
  }
};

export default async function EditClient({ params }) {
  const { id } = params;
  const client = await getClientById(id);

  if (!client) {
    return <Typography variant="h5" sx={{ p: 4 }}>Client not found.</Typography>;
  }

  return <EditClientForm id={id} client={client} />;
}
