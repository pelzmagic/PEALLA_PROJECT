import { Link } from 'react-router-dom'
import './header.css'

export default function Header({ user }) {
  function handleLogOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  return (
    <nav className='header'>
      <Link to='/'>
        <div className='header-logo'>
          <h1 className='header-title'><i>PEALLA</i></h1>
        </div>
      </Link>
      <div className='user-details'>
        <Link to='/login'><i className='bx bxs-log-out' onClick={handleLogOut} title='Log out'></i></Link>
        <h1 className='user-email'><i>Welcome</i> {' '} <span>{user}</span></h1>
      </div>
    </nav>
  )
}