import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

function Home() {
  const [faqs, setFaqs] = useState([]);

  const get_faqs = async () => {
    const response = await fetch(`https://api.staging.ragam.co.in/api/faqs`, {
      method: "GET"
    })
    return response;
  };

  useEffect(() => {
    async function setData() {
      let res_data = await get_faqs();
      res_data = await res_data.json();
      console.log(res_data)
      setFaqs(res_data.data);
    }
    setData()

  }, [])
  return (
    <div className={styles.top}>
      <h1 className={styles.hello}>Here &apos;s our most awaited fest</h1>
      <br />
      <h1 className={styles.hello}>RAGAM &apos;23</h1>
      {faqs.map((faq) => {
        // console.log(faq.attributes.category)
        if (faq.attributes.category == "GENERAL") {
          return (<div key={faq.id}>
            <span> {faq.attributes.question}</span>
            <br></br>
            <span> {faq.attributes.answer}</span>
          </div>);
        }

      })}

    </div>
  )
}

export default Home
