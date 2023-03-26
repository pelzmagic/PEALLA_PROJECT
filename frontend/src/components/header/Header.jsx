import { Link } from 'react-router-dom'
import './header.css'

export default function Header({ user }) {
  function handleLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
  }
  return (
    <nav className='header'>
      <Link to='/'>
        <div className='header-logo'>
          <i className='bx bx-check-double'></i>
          <h1 className='header-title'>PEALLA</h1>
        </div>
      </Link>
      <div className='user-details'>
        <Link to='/login'>
          <i className='bx bxs-log-out' onClick={handleLogout}></i>
        </Link>
        <h1 className='user-email'>
          Welcome <span>{user}</span>
        </h1>
      </div>
    </nav>
  )
}
