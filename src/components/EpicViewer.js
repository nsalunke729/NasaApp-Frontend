// src/components/EpicViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EpicViewer = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEpic = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/epic');
                setImages(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch EPIC images');
                setLoading(false);
            }
        };
        fetchEpic();
    }, []);

    // Construct image URL
    const buildImageUrl = (image) => {
        const date = new Date(image.date);
        const yyyy = date.getUTCFullYear();
        const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(date.getUTCDate()).padStart(2, '0');
        return `https://epic.gsfc.nasa.gov/archive/natural/${yyyy}/${mm}/${dd}/jpg/${image.image}.jpg`;
    };

    if (loading) return <div className="text-center my-4">Loading EPIC images...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2>Earth Polychromatic Imaging Camera (EPIC) Images</h2>
            <div className="row">
                {images.map((img) => (
                    <div key={img.identifier} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img src={buildImageUrl(img)} alt={img.caption} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text">{img.caption}</p>
                                <small className="text-muted">{new Date(img.date).toLocaleString()}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EpicViewer;
