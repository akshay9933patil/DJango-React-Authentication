import React, { useEffect, useState } from 'react'
import { fetchSubjectsApi } from '../../APIs/Auth';
import { NavLink } from 'react-router-dom';

function ShowSubjects() {
    const [subjects,setSubject] = useState([]);

    async function fetchSubjects(){
        const response = await fetchSubjectsApi();
        console.log('response:',response);
        setSubject(response.data);
    }
    useEffect(()=>{
        fetchSubjects();
    },[])
  return (
    <>
        <table className='table table-dark shadow text-center'>
            <thead>
                    <tr>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Action</th>
                    </tr>
            </thead>
            <tbody>
                    {
                        subjects.map(obj=>{
                            return (
                                <tr>
                                    <td>{obj.id}</td>
                                    <td>{obj.subject_name}</td>
                                    <td>
                                        <NavLink to={`/update/subject/${obj.id}/`}><button className='btn btn-warning btn-sm mr-3'>Update</button></NavLink>
                                        <NavLink to=''><button className='btn btn-danger btn-sm'>Delete</button></NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }
            </tbody>
        </table>
    </>
  )
}

export default ShowSubjects