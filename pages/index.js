import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import ragamFlame from  "../public/ragamflame.svg"
import { Collapse } from "antd";
import Image from "next/image";
import jonita from "../public/jonita.jpg"

function Home() {
  const [faqs, setFaqs] = useState([]);

  const get_faqs = async () => {
    const response = await fetch(`https://api.ragam.co.in/api/faqs`, {
      method: "GET"
    })
    return response;
  };

  useEffect(() => {
    async function setData() {
      let res_data = await get_faqs();
      res_data = await res_data.json();
      // console.log(res_data)
      setFaqs(res_data.data);
    }
    setData()

  }, [])
  return (<>
    <Image className={styles.background} src={jonita} fill/>
    <div className={styles.heroContainer}>
      <div  className={styles.hero}>
      <Image src={ragamFlame} width={250} height={250}/>
      <h1 className={`${styles.hello} ${styles.hello2}`}>RAGAM&apos;23</h1>
      <br />
      <h1 className={styles.hello}>10, 11, 12 March</h1>
      </div>

    </div>
    {faqs.length>0&&<div  className={styles.faq} id="faq">
      <h2>FAQs</h2>
      {faqs.map((faq) => {
        // console.log(faq.attributes.category)
        if (faq.attributes.category == "GENERAL") {
          return (<div key={faq.id}>
            {/* <span> {faq.attributes.question}</span>
            <br></br>
          <span> {faq.attributes.answer}</span> */}
            <Collapse bordered={false} onChange={() => { }}>
                <Collapse.Panel header={faq.attributes.question} key={faq.id}>
                <span> {faq.attributes.answer}</span>
                </Collapse.Panel>
            </Collapse>
          </div>);
        }
        
      })}
      </div>}
    </>
  )
}

export default Home
