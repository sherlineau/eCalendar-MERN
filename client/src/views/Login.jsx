import React, {useState} from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const Login = () => {
  const [form, setForm] = useState(true)

  const handleClick = e => {
    setForm(!form)
  }

  return (
    <div className='section'>
      {
        form? <LoginForm onClickProp={handleClick} /> : <RegisterForm onClickProp={handleClick} />
      }</div>
  )
}

export default Login