import EditClientForm from "@/components/EditClientForm";
const getClientById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
      cache: "no-cache",
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
  const { client } = await getClientById(id);
  return <EditClientForm id={id} client={client} />;
}