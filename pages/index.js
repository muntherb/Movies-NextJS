
import { useToasts } from 'react-toast-notifications'
import { useState } from 'react'
import styles from './index.module.scss'
import Navbar from '../components/Navbar';
import Button from "../components/Button";

export default function Home({ shows }) {
  const {addToast} = useToasts()
  const [showsArr, setShowsArr] = useState(shows);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://api.tvmaze.com/search/shows?q=${e.target.name.value}`);
    const result = await res.json();
    const newShows =  result.map(entry => entry.show)
    addToast(`Search successful,${newShows.length} results found! `, {appearance: "success", autoDismissTimeout: 1500})
    setShowsArr(newShows);
    console.log(newShows,showsArr)
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
            <input className={styles.search} placeholder="Search.." id="name" type="text" autoComplete="name" required />
            <button style={{display: 'none'}} type="submit"></button>
      </form>
    <Navbar />
    <h2 className={styles.header}>{showsArr.length > 0 ? 'Search results:' : 'Trending movies'}</h2>
    <ul className={styles.movies}>
      
      { showsArr.length > 0 ? 
      showsArr.map(show =>
        <li className={styles.content} key={show.id}>
          <img src={show?.image?.medium}></img>
          <h3>{show.name}</h3>
          <h5>Genre: {show?.genres?.length>0 ? show.genres.map(genre=><strong>{genre} </strong>): 'No genre found'}</h5>
          <h5>Rating: {show.rating?.average ?show.rating.average : 'No rating found'}</h5>
          <h5>Duration: {show.averageRuntime} minutes</h5>
          <h5>Language: {show.language}</h5>
          <Button type='addFav' show={show}/>
        </li>)
      :
      shows.map(show =>
        <li className={styles.content} key={show.id}>
          <img src={show?.image?.medium}></img>
          <h3>{show.name}</h3>
          <h5>Genre: {show?.genres?.length>0 ? show.genres.map(genre=><strong>{genre} </strong>): 'No genre found'}</h5>
          <h5>Rating: {show.rating?.average ?show.rating.average : 'No rating found'}</h5>
          <h5>Duration: {show.averageRuntime} minutes</h5>
          <h5>Language: {show.language}</h5>
          <Button type='addFav' show={show}/>
        </li>)}
    </ul>
    </>
  )
}

export async function getServerSideProps(context) {
  console.log(context)
  const res = await fetch('https://api.tvmaze.com/shows?page=1');
  const result = await res.json()
  const shows = { shows: result.map(entry => entry)};
  return {
    props: shows, // will be passed to the page component as props
  }
}



