// src/components/ImageSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageSearch = () => {
    const [query, setQuery] = useState('moon');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:5000/api/images?q=${query}`);
            // Filter for images only
            const items = res.data.collection.items.filter(item => item.data[0].media_type === 'image');
            setResults(items);
        } catch (err) {
            setError('Failed to fetch images');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>NASA Image and Video Library Search</h2>
            <form className="mb-4" onSubmit={handleSearch}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search NASA media..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-warning" type="submit">Search</button>
                </div>
            </form>
            {loading && <div>Loading results...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {results.map((item) => {
                    const data = item.data[0];
                    const img = item.links?.[0]?.href;
                    return (
                        <div key={item.data[0].nasa_id} className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <img src={img} alt={data.title} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title">{data.title}</h5>
                                    <p className="card-text" style={{ fontSize: '0.9rem' }}>{data.description?.slice(0, 100)}...</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageSearch;
