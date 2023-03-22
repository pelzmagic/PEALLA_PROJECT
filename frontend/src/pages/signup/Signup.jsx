import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
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
        email: user.email,
        password: user.password,
        
      }),
    })
    .then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 1000)
        return res.json();
      }
      throw new Error('Something went wrong');
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className='signup'>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h1 className='signup-title'>Sign up</h1>
            <input type='email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='signup-input' placeholder='Email address' required/>
            <input type='password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='signup-input' placeholder='Enter Password' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' required/>
            <input type='password' value={user.confirmPassword} onChange={(e) => setUser({...user, confirmPassword: e.target.value})} className='signup-input' placeholder='Confirm Password' required/>
            <button className='signup-btn'>{ loading ? 'Loading...' : 'Create account' }</button>
        </form>
        <footer>
            <small>Already have an account? <Link to='/login'><span>Log in</span></Link></small>
        </footer>
    </div>
  )
}
