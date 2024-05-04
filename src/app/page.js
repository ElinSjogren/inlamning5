'use client'
import { lazy } from 'react';
const SearchLazy = lazy(() => import('./components/SearchArtist/Search'));
import styles from './pagelayout/data/page.module.css';
import React, { useState, useEffect,Suspense } from 'react';
import { setLatestEventToSession } from './components/sessionstorage/session';

export default function Home() {
  const [latestEvent, setLatestEvent] = useState('');

  useEffect(() => {
    async function fetchData() {
      await setLatestEventToSession();
      const latestEventFromSession = sessionStorage.getItem('LatestEvent');
      setLatestEvent(latestEventFromSession);
    }

    fetchData();
  }, []);

  useEffect(() => {
    function handleSessionStorageChange() {
      const latestEventFromSession = sessionStorage.getItem('LatestEvent');
      setLatestEvent(latestEventFromSession);
    }

    window.addEventListener('storage', handleSessionStorageChange);

    return () => {
      window.removeEventListener('storage', handleSessionStorageChange);
    };
  }, []);

  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
      <div>
        <p className={styles.pFont}>Latest Event added:<br/> {latestEvent}</p>
        <SearchLazy/>
      </div>
      </Suspense>
    </>
  );
}
