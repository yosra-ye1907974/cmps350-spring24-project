
'use client'
import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "./statistics/navBar/NavBar";
import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    window.location.href = '/main-page.html';
  }, []);
  return (
    <>
      

    </>
  );
}
