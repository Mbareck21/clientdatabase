const getClients = async () => {
    try {
      const res =  await fetch("http://localhost:3000/api/clients", {
            cache: "no-store"
      })
        if (!re.ok) {
            throw new Error('Failed to fetch Data!')
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export default  getClients