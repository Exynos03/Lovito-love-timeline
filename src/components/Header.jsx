import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
        <img src='rainbow.png' alt='Logo' className='header-img'/>
        <h1 className='heading-txt'>Loveto Love Timeline</h1>
        <hr/>
    </header>
  )
}

export default Header
