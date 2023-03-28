import { useState } from 'react'
import { Link } from 'react-router-dom'
import './forgotpassword.css'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const backendUrl = 'http://localhost:3000'

    function handleSubmit(e) {
        e.preventDefault()
        console.log(email)
        fetch(`${backendUrl}/api/v1/requestpasswordreset/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
        e.target.reset();
    }

  return (
    <section className='forgot-password'>
        <h1 className='section-title'>Forgot Your Password?</h1>
        <p>No worries, we'll send you reset instructions</p>
        <form className='forgot-psw__form' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
            <button className='forgot-psw__btn'>Reset password</button>
            <small>
                <Link to='/login'>
                    <i className='bx bx-arrow-back'></i>
                    Back to log in
                </Link>
            </small>
        </form>
    </section>
  )
}