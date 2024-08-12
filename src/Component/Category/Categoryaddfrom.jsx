
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createcategory } from '../../Services/Categoryservices';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Categoryaddfrom() {
  const [categoryname, setCategoryname] = useState('');
  const navigate = useNavigate();

  function AddCategory(e) {
    e.preventDefault();
    const categoryList = { categoryname };
    console.log(categoryList);

    createcategory(categoryList).then((response) => {
      console.log(response.data);
      alert('data saved successfully');
      navigate('/List-Category');
    });
  }

  function cancel() {
    navigate('/List-Category');
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Add Category</h2>
        </div>
        <div className="card-body">
          <form onSubmit={AddCategory}>
            <div className="form-group mb-3">
              <label>Category Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category name"
                required
                value={categoryname}
                onChange={(e) => setCategoryname(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-primary me-2" type="submit">Save</button>
              <button className="btn btn-outline-danger" type="button" onClick={cancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
