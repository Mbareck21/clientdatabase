const getClients = async () => {
    try {
        const res = await fetch("/api/clients", {
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