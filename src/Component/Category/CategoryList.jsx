import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Listcategory, deletebyidcategory } from '../../Services/Categoryservices';

export default function CategoryList() {
  const [CategoryList, setCategoryList] = useState([]);
  const { categoryid} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Make an HTTP GET request to fetch data from the Spring Boot API
     Listcategory ().then(response => {
      setCategoryList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  

  const handleDeletecategory = (categoryid) => {
    // Make an HTTP DELETE request to delete the Idara
    deletebyidcategory(categoryid).then(response => {
        alert("idara already deleted");
        // If the deletion is successful, update the state to remove the deleted Idara
        setCategoryList(prevIdaraList => prevIdaraList.filter(category => category.categoryid !== categoryid));
      })
      .catch(error => {
        console.error('Error deleting Category:', error);
      });
  };



  return (
    <div>
      
      <table className='table table-striped table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { CategoryList.map(Category => (
            <tr key={Category.categoryid}>
              <td>{Category.categoryid}</td>
              <td>{Category.categoryname}</td>
              <td>
                <button  className='btn btn-outline-danger'  onClick={() => handleDeletecategory(Category.categoryid)}>Delete</button>
                <Link to={`/edit-Category/${Category.categoryid}`}  className='btn btn-outline-info'>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
