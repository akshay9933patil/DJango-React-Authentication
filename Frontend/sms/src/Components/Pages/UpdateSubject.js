import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSubjectAPi, updateSubjetApi } from '../../APIs/Auth';
import { useForm } from 'react-hook-form';

function UpdateSubject() {
    const {id} = useParams();
    const navigate = useNavigate();

    const {register, handleSubmit, setValue} = useForm();

    async function fetchSubjectApi(){
        const response = await fetchSubjectAPi(id);
        setValue('subject_name',response.data['subject_name']);
    }
    async function updateSubject(data){
        const response = await updateSubjetApi(data, id);

        if (response.status === 200){
            navigate('/show/subjects/');

        }
    }

    useEffect(()=>{
        fetchSubjectApi();
    },[])
  return (
    <>
        <form className='jumbotron container mt-5 shadow'>
            <center><h1>Update Student</h1></center>
            <br /><br />

            <label htmlFor=""><b>Enter Subject:</b></label>
            <input type="text" className='form-control' {...register('subject_name')}/>
            <br /><br />

            <input type="submit" className='btn btn-info col-5'/>
            <input type="reset" className='btn btn-warning col-5 float-right'/>
        </form>
    </>
  )
}

export default UpdateSubject