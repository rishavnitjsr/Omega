import React from "react";
import "./About.css";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import me from '../../../images/me.jpeg';

const About = () => {

  const visitGithub = () => {
    window.location = "https://github.com/rishavnitjsr/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">ABOUT US</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={me}
              alt="Rishav"
            />
            <Typography>Rishav</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit GitHub
            </Button>
            <span>
              This E-Commerce website is developed by @Rishav.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">PROFESSIONAL HANDLES</Typography>
            <a
              href="https://github.com/rishavnitjsr/"
              target="blank"
            >
              <GitHubIcon className="githubIcon" />
            </a>

            <a href="https://www.linkedin.com/in/rishavkumar21/" target="blank">
              <LinkedInIcon className="linkedinIcon" />
            </a>

            <Typography component="h2">MAIL US</Typography>
            <a className="mailBtn" href="mailto:rishavnitjsr21@gmail.com">
              <Button>rishavnitjsr21@gmail.com</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About