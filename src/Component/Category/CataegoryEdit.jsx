import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getbyidcategory, updatecategory } from '../../Services/Categoryservices';

export default function CataegoryEdit() {
  const [categoryname, setCategoryname] = useState('');
  const navigate = useNavigate();
  const { categoryid } = useParams();

  useEffect(() => {
    getbyidcategory(categoryid).then(response => {
        // Populate the name field with the fetched data
        setCategoryname(response.data.categoryname || '');
        
      })
      .catch(error => {
        console.error('Error fetching data by ID:', error);
      });
  }, [categoryid]);



  function EditCategory(e){
    e.preventDefault();
    const upateList ={categoryname}
    console.log(upateList);
   updatecategory(upateList,categoryid).then((response)=>{
      console.log(response.data);
      alert('data updated succesful');
      navigate('/List-Category')
    }).catch(err => console.log(err));
  }

  function cancel(){
    navigate('/List-Category')
}

  return (
    <div>
            <br></br>
         <br></br>
        <form >
        <input
          type="text"
          placeholder="Enter Category name "
          required
          name="categoryname"
          value={categoryname}
          onChange={(e) => setCategoryname(e.target.value)}
        />
         <br></br>
         <br></br>
      
        
        <button  className='btn btn-outline-primary' type="submit" onClick={EditCategory}>Update</button>
        <button  className='btn btn-outline-danger' type="button" onClick={cancel} >Cancel</button>
      </form>
      
    </div>
  )
}
