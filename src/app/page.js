"use client";

import style from './pagelayout/data/page.module.css';
import Search from './components/SearchArtist/Search'

let val =sessionStorage.getItem('LatestEvent');

export default function Home() {
  return (
    <>
      <div className={style.background}>
      <p style={{color:"white"}}>Veckans tips:</p>
      <p style={{color:"white"}}>{val}</p>
        <Search/>
      </div>
    </>
  );
}
