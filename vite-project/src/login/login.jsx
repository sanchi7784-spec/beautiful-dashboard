import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/future-8840101.jpg'
import logo from '../assets/logo (1).png' // rename file (no spaces)

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      onLogin()
      navigate('/dashboard')
    }
  }

  return (
    <div style={styles.page}>
      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Card */}
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrapper}>
          <img src={logo} alt="Ready Grocery" style={styles.logo} />
        </div>

        {/* Heading */}
        <h2 style={styles.heading}>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {/* Button */}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

/* ================== STYLES ================== */

const styles = {
  page: {
    minHeight: '100vh',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
  },

  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '420px',
    padding: '42px',
    borderRadius: '18px',
    background: 'rgba(235, 120, 120, 0.12)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.25)',
    boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '14px',
  },

  logo: {
    width: '180px',
    height: 'auto',
    objectFit: 'contain',
    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
    display: 'block',
  },

  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '30px',
    fontWeight: '700',
    color: '#ffffff',
  },

  field: {
    marginBottom: '22px',
  },

  label: {
    display: 'block',
    marginBottom: '6px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
  },

  input: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.35)',
    background: 'rgba(255,255,255,0.18)',
    color: '#ffffff',
    fontSize: '15px',
    outline: 'none',
  },

  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 8px 20px rgba(34,197,94,0.45)',
  },
}

export default Login
