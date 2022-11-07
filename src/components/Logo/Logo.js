import { Link } from 'react-router-dom';
import './Logo.css'
const Logo = ({ modClass }) => {
  return (
    <Link to='/' className={`interactiv-element logo logo_${modClass}`} />
  )
}

export default Logo;