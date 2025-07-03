// src/components/NeoDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NeoDashboard = () => {
    const [neos, setNeos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNeo = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/neo');
                // Flatten the objects by dates
                const neoObjects = Object.values(res.data.near_earth_objects).flat();
                setNeos(neoObjects);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch Near Earth Objects');
                setLoading(false);
            }
        };
        fetchNeo();
    }, []);

    if (loading) return <div className="text-center my-4">Loading Near Earth Objects...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <h2>Near Earth Object Web Service (NeoWs)</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Close Approach Date</th>
                            <th>Magnitude</th>
                            <th>Diameter (m)</th>
                            <th>Potentially Hazardous</th>
                        </tr>
                    </thead>
                    <tbody>
                        {neos.map((neo) => {
                            const approachData = neo.close_approach_data[0];
                            return (
                                <tr key={neo.id}>
                                    <td>{neo.name}</td>
                                    <td>{approachData?.close_approach_date}</td>
                                    <td>{neo.absolute_magnitude_h}</td>
                                    <td>
                                        {neo.estimated_diameter.meters.estimated_diameter_min.toFixed(1)} -{' '}
                                        {neo.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}
                                    </td>
                                    <td>{neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NeoDashboard;
