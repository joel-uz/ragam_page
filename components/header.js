import styles from '../styles/Home.module.css'
import Link from 'next/link'

function Header() {
    return <>
    <header className={styles.layout_header}>
        <span>RAGAM</span>
        <div className='pages'>
            <span><Link href='/category' className={styles.span_items}>Category</Link></span>
            <span><Link href='/' className={styles.span_items}>Home</Link></span>
        </div>
    </header>
    </>
}

export default Header