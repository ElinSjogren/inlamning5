"use client";
import { lazy } from 'react';

const SearchLazy = lazy(() => import('./components/SearchArtist/Search'));
import style from './pagelayout/data/page.module.css';
import Search from './components/SearchArtist/Search'

let val =sessionStorage.getItem('LatestEvent');

export default function Home() {
  return (
    <>
      <div className={style.background}>
      <p style={{color:"white"}}>Veckans tips:</p>
      <p style={{color:"white"}}>{val}</p>
        <SearchLazy/>
      </div>
    </>
  );
}
