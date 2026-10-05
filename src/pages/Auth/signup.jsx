import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiBox, FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import Message from '../../components/Message'
import API_URL from '../../config'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState({ text: '', type: 'error' })

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg({ text: '', type: 'error' })

    if (password !== confirmPassword) {
      setMsg({ text: 'Passwords do not match.', type: 'error' })
      return
    }

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()

      if (response.ok) {
        setMsg({ text: data.message, type: 'success' })
        setTimeout(() => navigate('/'), 1000)
      } else {
        setMsg({ text: data.message, type: 'error' })
      }
    } catch (error) {
      setMsg({ text: 'Backend se connection nahi ho raha.', type: 'error' })
    }
  }

  return (
    <div className='min-h-screen bg-[#0d1b2a] flex flex-col'>
      <div className='flex flex-1 flex-col lg:flex-row items-center justify-center px-6 py-10 gap-8 lg:gap-0 lg:px-12'>

        {/* Left — Logo + Copyright */}
        <div className='flex flex-col items-center justify-center gap-3 lg:w-72 shrink-0'>
          <FiBox size={64} color='#3b82f6' />
          <span className='text-white font-semibold text-xl'>Mini Inventory</span>
          <p className='text-gray-600 text-xs mt-1'>© 2026 Mini Inventory</p>
        </div>

        {/* Divider — hidden on mobile */}
        <div className='hidden lg:block w-px bg-white/20 self-stretch mx-16'></div>

        {/* Form */}
        <div className='bg-[#112240] border border-[#1e3a5f] rounded-2xl p-6 sm:p-8 w-full max-w-md'>
          <h2 className='text-white text-2xl font-bold text-center mb-1'>Create an account</h2>
          <p className='text-blue-400 text-sm text-center mb-6'>Start managing your inventory</p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {msg.text && <Message message={msg.text} type={msg.type} />}

            <div>
              <label className='text-gray-300 text-sm mb-1 block'>Full Name</label>
              <div className='flex items-center bg-[#0d1b2a] border border-[#1e3a5f] rounded-lg px-3 py-2 gap-2'>
                <FiUser className='text-gray-400' />
                <input type='text' value={name} onChange={(e) => setName(e.target.value)}
                  placeholder='Your name' required
                  className='bg-transparent text-white text-sm outline-none w-full placeholder-gray-500' />
              </div>
            </div>

            <div>
              <label className='text-gray-300 text-sm mb-1 block'>Email</label>
              <div className='flex items-center bg-[#0d1b2a] border border-[#1e3a5f] rounded-lg px-3 py-2 gap-2'>
                <FiMail className='text-gray-400' />
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder='you@example.com' required
                  className='bg-transparent text-white text-sm outline-none w-full placeholder-gray-500' />
              </div>
            </div>

            <div>
              <label className='text-gray-300 text-sm mb-1 block'>Password</label>
              <div className='flex items-center bg-[#0d1b2a] border border-[#1e3a5f] rounded-lg px-3 py-2 gap-2'>
                <FiLock className='text-gray-400' />
                <input type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} required placeholder='••••••••'
                  className='bg-transparent text-white text-sm outline-none w-full placeholder-gray-500' />
                <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-gray-400 hover:text-white'>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className='text-gray-300 text-sm mb-1 block'>Confirm Password</label>
              <div className='flex items-center bg-[#0d1b2a] border border-[#1e3a5f] rounded-lg px-3 py-2 gap-2'>
                <FiLock className='text-gray-400' />
                <input type={showConfirm ? 'text' : 'password'} value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} placeholder='••••••••'
                  required
                  className='bg-transparent text-white text-sm outline-none w-full placeholder-gray-500' />
                <button type='button' onClick={() => setShowConfirm(!showConfirm)} className='text-gray-400 hover:text-white'>
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition'>
              Create Account
            </button>
          </form>

          <p className='text-gray-400 text-sm text-center mt-5'>
            Already have an account?{' '}
            <Link to='/' className='text-blue-400 hover:underline font-medium'>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
