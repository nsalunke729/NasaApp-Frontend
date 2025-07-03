import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarsPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/mars')
            .then(res => {
                setPhotos(res.data.photos || []);
                setFilteredPhotos(res.data.photos || []);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const query = search.toLowerCase();
        const filtered = photos.filter(photo =>
            photo.rover.name.toLowerCase().includes(query) ||
            photo.camera.full_name.toLowerCase().includes(query)
        );
        setFilteredPhotos(filtered);
    }, [search, photos]);

    return (
        <div className="container my-5">
            <h2 className="text-warning mb-4">Mars Rover Photos</h2>

            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by rover or camera..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="row g-4">
                {filteredPhotos.length > 0 ? (
                    filteredPhotos.map((photo) => (
                        <div className="col-sm-6 col-md-4 col-lg-3" key={photo.id}>
                            <div className="card bg-dark text-white border-light h-100">
                                <img src={photo.img_src} className="card-img-top" alt="Mars" />
                                <div className="card-body">
                                    <h5 className="card-title text-warning">{photo.rover.name}</h5>
                                    <p className="card-text"><strong>Camera:</strong> {photo.camera.full_name}</p>
                                    <p className="card-text"><small className="text-muted">Date: {photo.earth_date}</small></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-muted">No photos found.</p>
                )}
            </div>
        </div>
    );
};

export default MarsPhotos;
