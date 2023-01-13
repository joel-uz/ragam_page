import { useEffect, useState } from "react"

const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = '7f46e74dc6fb8b483d8bcc5a5204b3d10d694ccff95531ed79db4ee63c6fd7cc95975b5c573aa0c6eb444059236b1205c2a30cf896d5850de0f15cad91d3d510829d1336016b0f3b76e35a7da72cfaadb4168669302de12ac208538c1bf67e4e7ab76e680f34033b346a028bd5b1f203c1387e1b8e676da9dddd7ce48899d63a'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      try {
        const res = await fetch(url,{
            headers: {
                Authorization:
                    `Bearer ${token}`,
                },
            })
        const json = await res.json()

        setData(json);
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData();
  }, [url])

  return { loading, error, data }
}

export default useFetch
