
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Listcategory, deletebyidcategory } from '../../Services/Categoryservices';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const { categoryid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch category list from API
        Listcategory().then(response => {
            setCategoryList(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleDeletecategory = (categoryid) => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
        // Handle category deletion logic
        deletebyidcategory(categoryid).then(response => {
            alert("Category deleted successfully");
            // Update state after deletion
            setCategoryList(prevCategoryList => prevCategoryList.filter(category => category.categoryid !== categoryid));
        }).catch(error => {
            console.error('Error deleting category:', error);
        });
    }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>List Category</h2>
                </div>
                <div className="card-body">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList.map(Category => (
                                <tr key={Category.categoryid}>
                                    <td>{Category.categoryid}</td>
                                    <td>{Category.categoryname}</td>
                                    <td>
                                        <button className='btn btn-outline-danger me-2' onClick={() => handleDeletecategory(Category.categoryid)}>
                                            <FaTrash />
                                        </button>
                                        <Link to={`/edit-Category/${Category.categoryid}`} className='btn btn-outline-info me-2'>
                                            <FaEdit />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
