import EditClientForm from "@/components/EditClientForm";
  const getClientById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to get client");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newClient = {
      principalApplicant,
      contact,
      caseSize,
      country,
      pendingCase,
      applicationDate,
      caseType,
      receipt,
      caseStatus,
      lawyer,
      notes,
      interviewDate,
      biometricsDate,
      approvalDate,
      denialDate,
      caseClosingDate,
    };
    try {
      const res = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      console.log(JSON.stringify({ newClient }));
      if (!res.ok) {
        throw new Error("Failed to edit client information");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
};
  

export default async function EditClient({ params }) {
  const { id } = params;
  const { client } = await getClientById(id);
  return <EditClientForm id={id} client={client} />;
}