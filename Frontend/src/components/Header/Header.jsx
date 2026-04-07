import React from 'react'
import style from './header.module.css'

const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.headerContent}>
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes and variety of cuisines.</p>
        <a href="#ExploreMenu"><button>View Menu</button></a>
      </div>
    </div>
  )
}

export default Header
