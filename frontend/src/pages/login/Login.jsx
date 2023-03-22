import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
    const navigate = useNavigate();
    const [type, setType] = useState(true);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const backendUrl = 'http://localhost:3000';
    function handleSubmit(event) {
        event.preventDefault();
        fetch(`${backendUrl}/api/v1/auth/login`, {
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
                setTimeout(() => {
                    navigate('/dashboard');
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
    <div className='login'>
        <form className='login-form' onSubmit={handleSubmit}>
            <h1 className='login-title'>Login</h1>
            <h2 className='login-subtitle'>Welcome Back!</h2>
            <div>
                <label htmlFor='email' className='login-label'>Email Address</label>
                <input type='email' name='email' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='login-input' placeholder='e.g. example@domain.com' required/>
            </div>
            <div>
                <label htmlFor='psw' className='login-label'>Password</label>
                <div className='password-box'>
                    <input type={type ? 'password' : 'text'}  name='psw' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='login-input' placeholder='Must have at least 6 characters' required/>
                    { type ? <i className="uil uil-eye-slash" onClick={() => setType(!type)}></i> :
                    <i className="uil uil-eye" onClick={() => setType(!type)}></i> }
                </div>
            </div>
            <p><a href='#'>Forgot password?</a></p>
            <button className='login-btn'>Login</button>
        </form>
        <footer>
            <small>Don't have an account? <Link to='/'><span>SIGNUP</span></Link></small>
        </footer>
    </div>
  )
}
