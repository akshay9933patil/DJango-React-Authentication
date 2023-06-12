import React from 'react'

function AddStudent() {
  return (
    <>
        <form className='container jumbotron mt-5 shadow'>
            <center><b>Add Student</b></center>
            <br /><br />
            <label htmlFor=""><b>Roll Number:</b></label>
            <input type="number" className='form-control'/>
            <br />
            <label htmlFor=""><b>Enter First Name:</b></label>
            <input type="text" className='form-control'/>
            <br />
            <label htmlFor=""><b>Enter Last Name:</b></label>
            <input type="text" className='form-control'/>
            <br />
            <label htmlFor=""><b>Address:</b></label>
            <textarea name="" id="" cols="30" rows="3" className='form-control'></textarea>
        </form>
    </>
  )
}

export default AddStudent