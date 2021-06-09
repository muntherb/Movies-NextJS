import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import {isMobile} from 'react-device-detect';
import Link from 'next/link'
import styles from '../pages/index.module.scss'

const Navbar = () => {
    return( 
        <nav className={styles.navbar}>
    <ul className={styles.nav}>
      <li>
        <Link href="/" as="/" className={styles.link}>
        {isMobile ?  <FontAwesomeIcon className={window.location.pathname === '/' ?  styles.iconS : styles.icon} icon={faHome}></FontAwesomeIcon> :<a><FontAwesomeIcon className={styles.icon} icon={faHome}></FontAwesomeIcon>Home </a> }
        </Link>
      </li>
      <li>
        <Link href="/favorites" as="/favorites">
          
          {isMobile ?  <FontAwesomeIcon className={window.location.pathname === '/favorites' ?  styles.iconS : styles.icon} icon={faHeart}></FontAwesomeIcon> : <a><FontAwesomeIcon className={styles.icon} icon={faHeart}></FontAwesomeIcon>Liked</a>}
        </Link>
      </li>
    </ul>
    
    </nav>
    )
}
export default Navbar