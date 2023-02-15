import Image from "next/image"
import  {AiOutlineDoubleRight} from 'react-icons/ai'
import coverImage from "../public/coverimg.jpg"
import  styles from "../styles/profile.module.css"
import Link from 'next/link'
function getLink(data, category){
  if(category=="Workshops"){
    return `/${category.toLowerCase()}/${data.id}`
  }
  return `/${"ragnarok"}/${data.id}`

}
const RegCard = ({data,category}) => {
  return (
    <Link href={getLink(data,category)}>
    <div    className={styles.regCardContainer}>
        <h2 className={styles.regCardTitle}>{data.name}</h2>
        <Image className={styles.regCardImg} src={data.coverImage?`https://api.ragam.co.in${data.coverImage.url?data.coverImage.url:data.coverImage}`:coverImage} width={300} height={200}/>
        <AiOutlineDoubleRight className={styles.regCardIcon}/>
    </div>
    </Link>
  )
}

export default RegCard