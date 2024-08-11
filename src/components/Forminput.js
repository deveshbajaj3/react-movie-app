import React, { useState } from 'react'
import './formInput.css';

function Forminput(props) {
    const {errorMessage, onChange} = props
    const [focused, setFocused] = useState(false)
    const handleFocused =()=>{
        setFocused(true);
    }
  return (
    <div className='form-input'>
        <input onChange={onChange} onBlur={()=>handleFocused()} focused={focused.toString()}  {...props} required />
        <span className='sign'>{errorMessage}</span>
    </div>
  )
}

export default Forminput