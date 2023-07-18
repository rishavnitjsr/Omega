import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <p>DOWNLOAD APPS<br /></p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>E-COMMERCE</h1>
        <p>Demo Version</p>
        <p>RISHAV &copy; 2023</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us : </h4>
        <span>
          <a href="https://instagram.com/rishavbajaj01/"> <InstagramIcon /> <span id='gapIcon' /></a>
          <a href="https://github.com/rishavnitjsr/"> <GitHubIcon /><span id='gapIcon' /></a>
          <a href="https://www.linkedin.com/in/rishavkumar21/"> <LinkedInIcon /><span id='gapIcon' /></a>
        </span>
      </div>
    </footer>
  )
}

export default Footer