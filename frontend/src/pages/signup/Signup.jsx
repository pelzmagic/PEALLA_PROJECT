import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [userexists, setUserExists] = useState(false);
  const backendUrl = 'http://localhost:3000';
  function handleSubmit(event) {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    setLoading(true);
    fetch(`${backendUrl}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
        
      }),
    })
    .then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 800)
        return res.json();
      } else if (res.status === 401) {
        return res.json();
      }
      setLoading(false);
      throw new Error('Something went wrong');
    })
    .then((data) => {
      console.log(data);
      if (data.message === 'User with this email already exists') {
        setUserExists(true);
        setTimeout(() => setUserExists(false), 4000)
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <section className='signup'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <h1 className='signup-title'>Sign up</h1>
        <div className='username'>
          <label htmlFor='username'>Username</label>
          <input type='text' value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} className='signup-input' placeholder='Enter username' required/>
        </div>

        <div className='user-email'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} className='signup-input' placeholder='e.g. example@domain.com' required/>
          { userexists && <small className='user-exists'>User already exists</small> }
        </div>

        <div className='user-password'>
          <label htmlFor='password'>Password</label>
          <input type='password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='signup-input' placeholder='Must have atleast 8 characters' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Must contain atleast one number and one uppercase and lowercase letter, and atleast 8 or more characters' required/>
        </div>
        <div className='user-confirm__password'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input type='password' value={user.confirmPassword} onChange={(e) => setUser({...user, confirmPassword: e.target.value})} className='signup-input' required/>
        </div>
        <button className='signup-btn'>{ loading ? 'Loading...' : 'Create account' }</button>
      </form>
      <footer>
        <small>Already have an account? <Link to='/login'><span>Log in</span></Link></small>
      </footer>
    </section>
  )
}