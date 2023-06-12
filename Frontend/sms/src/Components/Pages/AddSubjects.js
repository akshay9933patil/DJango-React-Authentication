import React from 'react';
import { useForm } from 'react-hook-form';
import { addSubjectApi } from '../../APIs/Auth';
import { useNavigate } from 'react-router-dom';

function AddSubjects() {

    const {register, handleSubmit, setError, formState:{errors}, setFocus} = useForm();
    const navigate = useNavigate();

    async function saveSubject(subject, event){
        event.preventDefault()
        try{
            // Save Subject and navigate to other page.
            if (event.nativeEvent.submitter.name === 'save'){

                const response = await addSubjectApi(subject);

                if (response.status === 201){
                    navigate('/home/');
                }
        }
            // Save Subject and reload the page.
            else if(event.nativeEvent.submitter.name === 'add_another'){
                const response = await addSubjectApi(subject);
                
                if (response.status === 201){
                    window.location.reload();
                }
            }

        } catch(error){
                console.log('error:',error.response.data['subject_name'][0]);
                setError('subject_name',{type:'server',message:`${error.response.data['subject_name'][0]}`},true);
                setFocus('subject_name', {shouldSelect:true});
            }    
    }

  return (
    <>
        <form onSubmit={handleSubmit(saveSubject)} className='container jumbotron mt-5 shadow'>
            <center><h1>Add Subject</h1></center>
            <br /><br />
            <label htmlFor=""><b>Subject Name:</b></label>
            <input type="text" className='form-control' placeholder='e.g. English'{...register('subject_name')}/>
            {errors.subject_name && <span className='text-danger'>{errors.subject_name.message}</span>}
            <br /><br />
            
            <input type="submit" name='save' value="Save" className='btn btn-danger col-5 float-left'/>
            <input type="submit" name='add_another' value="Save & Add Another" className='btn btn-info col-5 float-right'/>
        </form>
    </>
  )
}

export default AddSubjects