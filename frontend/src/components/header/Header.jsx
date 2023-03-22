import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  function handleLogOut() {
    sessionStorage.removeItem('token');
  }
  return (
    <nav className='header'>
        <Link to="/"><i className='bx bxl-trello'></i></Link>
        <h1>Trello Clone</h1>
        <Link to='/'><i className='bx bx-log-out' onClick={handleLogOut}></i></Link>
    </nav>
  )
}
