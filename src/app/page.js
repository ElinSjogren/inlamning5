"use client";
import { lazy } from 'react';

const SearchLazy = lazy(() => import('./components/SearchArtist/Search'));
import styles from './pagelayout/data/page.module.css';

let val =sessionStorage.getItem('LatestEvent');

export default function Home() {
  return (
    <>
      <div>
      <p className={styles.pFont}>Veckans tips:</p>
      <p className={styles.pFont}>{val}</p>
        <SearchLazy/>
      </div>
    </>
  );
}
