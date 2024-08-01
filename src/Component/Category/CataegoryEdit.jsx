import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getbyidcategory, updatecategory } from '../../Services/Categoryservices';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategoryEdit() {
  const [categoryname, setCategoryname] = useState('');
  const navigate = useNavigate();
  const { categoryid } = useParams();

  useEffect(() => {
    getbyidcategory(categoryid)
      .then(response => {
        setCategoryname(response.data.categoryname || '');
      })
      .catch(error => {
        console.error('Error fetching data by ID:', error);
      });
  }, [categoryid]);

  const handleEditCategory = (e) => {
    e.preventDefault();
    const updatedCategory = { categoryname };
    updatecategory(updatedCategory, categoryid)
      .then(response => {
        alert('Data updated successfully');
        navigate('/List-Category');
      })
      .catch(err => console.error('Error updating category:', err));
  };

  const handleCancel = () => {
    navigate('/List-Category');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Edit Category</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleEditCategory}>
            <div className="form-group mb-3">
              <label htmlFor="categoryname">Category Name</label>
              <input
                type="text"
                id="categoryname"
                className="form-control"
                placeholder="Enter category name"
                required
                value={categoryname}
                onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-primary me-2" type="submit">Update</button>
              <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
