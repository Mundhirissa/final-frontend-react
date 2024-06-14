import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createcategory } from '../../Services/Categoryservices';

export default function Categoryaddfrom() {


  const [categoryname, setCategoryname] = useState('');
  const navigate = useNavigate();

  function AddCategory(e){
    e.preventDefault();
    const categoryList ={categoryname}
    console.log(categoryList);

    createcategory(categoryList).then((response)=>{
      console.log(response.data);
      alert('data saved succesful');
      navigate('/List-Category')
      
    })
  }

  function cancel(){
    navigate('')
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
      
        
        <button  className='btn btn-outline-primary' type="submit" onClick={AddCategory}>Save</button>
        <button  className='btn btn-outline-danger' type="button" onClick={cancel} >Cancel</button>
      </form>
    </div>
  )
}
