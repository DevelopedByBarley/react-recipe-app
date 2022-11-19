import './Footer.css'
import { Link, NavLink } from 'react-router-dom';
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'

export function Footer() {
  return (
    <div className='footer'>
      <div className="personal-contact">
        <a href='https://www.facebook.com/arpad.szaniszlo.1' target="_blank">
          <AiFillFacebook size={40} />
        </a>
        <a href='https://github.com/DevelopedByBarley' target="_blank">
          <AiFillGithub size={40} />
        </a>
      </div>
    </div>
  )
}