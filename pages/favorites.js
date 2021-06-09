import styles from './index.module.scss'
import Navbar from '../components/Navbar';
import Button from "../components/Button";

export default function Favorites({ shows }) {

  return ( 
  <>
 <Navbar />
 <div className={styles.topDiv}>
  <h3 className={styles.header}>Favorites List</h3>
  <Button type='deleteAll' show=''/>
 </div>
<ul className={styles.movies}>
      {shows?.length > 0 ? shows.map(show =>
        <li className={styles.content} key={show.id}>
          <img src={show?.image?.medium}></img>
          <h3>{show.name}</h3>
          <h5>Genre: {show.genres.length>0 ? show.genres.map(genre=><strong>{genre} </strong>): 'No genre found'}</h5>
          <h5>Rating: {show.rating.average ?show.rating.average : 'No rating found'}</h5>
          <h5>Duration: {show.averageRuntime} minutes</h5>
          <h5>Language: {show.language}</h5>
          {/* <p>{show.summary}</p> */}
          <Button type='deleteById' show={show}/>
        </li>) : "No Favorites Yet!"}
    </ul>
   
</>
  )
}


Favorites.getInitialProps = async function() {
  const res = await fetch('http://localhost:3100/api/movies');
  const shows = await res.json()
  return {shows: shows}
}

