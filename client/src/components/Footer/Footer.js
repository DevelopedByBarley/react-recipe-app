import './Footer.css'
import { Link, NavLink } from 'react-router-dom';
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { MdMarkEmailUnread } from 'react-icons/md'

export function Footer() {
  return (
    <div className='footer'>
      <h1>Köszönöm a figyelmet!</h1>
      <div className="personal-contact">
        <a href='developedbybarley@gmail.com'>
          <MdMarkEmailUnread size={40} />
        </a>
        <a href='https://www.facebook.com/arpad.szaniszlo.1'>
          <AiFillFacebook size={40} />
        </a>
        <a href='https://github.com/DevelopedByBarley'>
          <AiFillGithub size={40} />
        </a>
      </div>
    </div>
  )
}