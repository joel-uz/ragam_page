export const fetchUserReg = async (url, token) => {

    if (token != ''){
        try {
            const res = await fetch(url, {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            })
            const value = await res.json()
        
            return value
          }
        catch (err) {
            console.log(err)
          }
    }
  }
  
  