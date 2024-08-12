
import React, { useState } from 'react';
import { createstadium } from '../../Services/Stadiumservices';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StadiumAddform() {

  const [name, setname] = useState('');
  const [capacity, setcapacity] = useState('');
  const [location, setlocation] = useState('');
  const [daytimePrice, setDaytimePrice] = useState('');
  const [nighttimePrice, setNighttimePrice] = useState('');
  const navigate = useNavigate();

  function AddStadium(e){
    e.preventDefault();
    const StadiumList = {name, capacity, location,daytimePrice,nighttimePrice};
    console.log(StadiumList);

    createstadium(StadiumList).then((response)=>{
      console.log(response.data);
      alert('data saved successfully');
      navigate('/List-stadium');
    });
  }

  function cancel(){
    navigate('/List-stadium');
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>ADD STADIUM FORM</h2>
        </div>
        <div className="card-body">
          <form onSubmit={AddStadium}>
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name of stadium"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Capacity</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter capacity of stadium"
                required
                value={capacity}
                onChange={(e) => setcapacity(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location of stadium"
                required
                value={location}
                onChange={(e) => setlocation(e.target.value)}
              />
            </div>

            <div className="form-group mb-3">
                            <label htmlFor="daytimePrice">daytimePrice</label>
                            <input
                                type="number"
                                id="daytimePrice"
                                className="form-control"
                                placeholder="Enter daytimePrice of stadium"
                                required
                                value={daytimePrice}
                                onChange={(e) => setDaytimePrice(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="nighttimePrice">nighttimePrice</label>
                            <input
                                type="number"
                                id="nighttimePrice"
                                className="form-control"
                                placeholder="Enter nighttimePrice of stadium"
                                required
                                value={nighttimePrice}
                                onChange={(e) => setNighttimePrice(e.target.value)}
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
