import React, { useEffect, useState } from 'react'
import './Preloader.css'

const Preloader = ({isMovies}) => {


  const [searhStatus, setSearhStatus] = useState(false);

useEffect(()=>{
  const timer = setTimeout(()=>{
    setSearhStatus(isMovies);},1500)
  return ()=>{
    setSearhStatus(false);
    clearTimeout(timer);}},[])
  return (
    <div className='preloader'>
      <div className='preloader__container'>
       {searhStatus ? <p className='preloader__text'>Ничего не найдено</p> :
        <span className='preloader__round'></span>}

      </div>
    </div>
  )
};

export default Preloader
