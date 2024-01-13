const getClients = async () => {
    try {
      const res =  await fetch("http://localhost:3000/api/clients", {
            cache: "no-store"
      })
        if (!res.ok) {
            throw new Error('Failed to get Data!')
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export default  getClients