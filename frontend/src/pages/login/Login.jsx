import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'

export default function Login() {
    const navigate = useNavigate();
    const [loggingIn, setLoggingIn] = useState(false);
    const [userDoesNotExist, setUserDoesNotExist] = useState(false);
    const [passwordIncorrect, setPasswordIncorrect] = useState(false);
    const [type, setType] = useState(true);
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const backendUrl = 'http://localhost:3000';
    function handleSubmit(event) {
        event.preventDefault();
        setLoggingIn(true);
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
                return res.json();
            } else if (res.status === 401) {
                return res.json();
            }
            alert('Invalid email or password');
            setLoggingIn(false);
            throw new Error('Something went wrong');
        })
        .then((data) => {
            console.log(data);
            if (data.message === 'User does not exist') {
                setUserDoesNotExist(true);
                setTimeout(() => setUserDoesNotExist(false), 4000);
                setLoggingIn(false);
            } else if (data.message === 'Password incorrect') {
                setPasswordIncorrect(true);
                setTimeout(() => setPasswordIncorrect(false), 4000);
                setLoggingIn(false);
            } else {
                setLoggingIn(false);
                sessionStorage.setItem('token', JSON.stringify(data.token));
                sessionStorage.setItem('user', JSON.stringify(data.user.username));
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000)
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className= 'login'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-title'>Login</h1>
                <h2 className='login-subtitle'>Welcome Back!</h2>
                <div>
                    <label htmlFor='email' className='login-label'>Email Address</label>
                    <input type='email' placeholder='Email address' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className='login-input' required/>
                    { userDoesNotExist && <small className='user-not-found'>User does not exist</small> }
                </div>
                <div>
                    <label htmlFor='password' className='login-label'>Password</label>
                    <div className='password-box'>
                        <input type={type ? 'password' : 'text'} placeholder='Enter your password' value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} className='login-input' required/>
                        { type ? <i className="uil uil-eye-slash" onClick={() => setType(!type)}></i> :
                        <i className="uil uil-eye" onClick={() => setType(!type)}></i> }
                        {passwordIncorrect && <small className='password-incorrect'>Incorrect password</small> }
                    </div>
                </div>
                <p><a href='#'>Forgot password?</a></p>
            <button className='login-btn'>{ loggingIn ? 'Logging in...' : 'Login'}</button>
        </form>
        <footer>
            <small>Don't have an account? <Link to='/'><span>SIGNUP</span></Link></small>
        </footer>
    </div>
  )
}