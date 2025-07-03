import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApodViewer = () => {
    const [apod, setApod] = useState(null);
    const [date, setDate] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        fetchApod();
    }, []);

    const fetchApod = async (customDate) => {
        try {
            const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY${customDate ? `&date=${customDate}` : ''}`);
            setApod(res.data);
        } catch (err) {
            console.error('Error fetching APOD:', err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchDate) {
            fetchApod(searchDate);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-warning mb-4">Astronomy Picture of the Day</h2>

            <form className="row g-3 mb-4" onSubmit={handleSearch}>
                <div className="col-md-4">
                    <input
                        type="date"
                        className="form-control"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-warning w-100" type="submit">Search</button>
                </div>
            </form>

            {apod ? (
                <div className="card bg-dark text-light border-light">
                    {apod.media_type === "image" ? (
                        <img src={apod.url} className="card-img-top" alt={apod.title} />
                    ) : (
                        <div className="ratio ratio-16x9">
                            <iframe src={apod.url} title="NASA Video" allowFullScreen />
                        </div>
                    )}
                    <div className="card-body">
                        <h5 className="card-title text-warning">{apod.title}</h5>
                        <p className="card-text">{apod.explanation}</p>
                        <p className="card-text"><small className="text-muted">Date: {apod.date}</small></p>
                    </div>
                </div>
            ) : (
                <div className="text-muted">Loading...</div>
            )}
        </div>
    );
};

export default ApodViewer;
