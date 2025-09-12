import { Routes, Route, useNavigate } from 'react-router-dom'
import Profile from './assets/profile.jpg'
import linkedinLogo from './assets/linkedin.svg'
import githubLogo from './assets/github.png'
import DownloadIcon from './assets/download.png'
import mailLogo from './assets/mail.png'
import Projects from './Projects'
import Contact from './Contact'
import './App.css'

const email = "lucas.sangkhavongs@epitech.eu";
const status = "EPITECH Lyon Student";
const linkedin = "https://www.linkedin.com/in/lucas-sangkhavongs/";
const github = "https://github.com/lucaskvn";

function About() {
  return (
    <div className="Rectangles-container">
      <div className="Rounded-rectangle">
        <img src={Profile} alt="Profile" className="Profile-rectangle" />
        <a href="/src/assets/CV_LucasSangkhavongs.pdf" download className="CV-download-btn">
          Download CV
          <span className="DownloadArrow">
            <img src={DownloadIcon} alt="Download" width={22} height={22} />
          </span>
        </a>
        <div className="Profile-vertical-divider"></div>
        <div className="Profile-content">
          <h2>Lucas Sangkhavongs</h2>
          <div className="Profile-subtitle">{status}</div>
          <p>I'm Lucas Sangkhavongs, I'm 19 years old and a second-year EPITECH student based in Lyon, France. I'm passionate about programming and computers.<br />
          </p>
          <p>I build apps in C and Python</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="Navbar">
        <div className="Navbar-divider"></div>
        <span className="Navbar-title">lucasskvn</span>
        <div className="Navbar-center">
          <span className="Navbar-About" onClick={() => navigate('/')}>Home</span>
          <span className="Navbar-Projects" onClick={() => navigate('/projects')}>Projects</span>
          <span className="Navbar-Contact" onClick={() => navigate('/contact')}>Contact</span>
        </div>
        <div className="Navbar-socials">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" className="SocialLogo" />
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" className="SocialLogo" />
          </a>
          <a href={`mailto:${email}`}>
            <img src={mailLogo} alt="Email" className="SocialLogo" />
          </a>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
