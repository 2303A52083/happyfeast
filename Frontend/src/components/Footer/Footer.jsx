import React from 'react'
import style from './footer.module.css'
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className={style.Footer} id="Footer">
      <div className={style.FooterContent}>
        <div className={style.FooterContentLeft}>
          <div className={style.logoText}>Happy<span>Feast</span></div>
          <p>HappyFeast — Indulge in a variety of mouthwatering dishes made to match your mood and cravings</p>
          <div className={style.FooterSocial}>
            <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className={style.FooterContentMiddle}>
        </div>
        <div className={style.FooterContentRight}>
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 9182910373</li>
            <li>+91 7207512376</li>
            <li>happyfeast@gmail.com</li>
            <li>happyfeastcustomersupport@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className={style.FooterCopyrigth}>
        CopyRight 2026 ©️ HappyFeast.com - All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer