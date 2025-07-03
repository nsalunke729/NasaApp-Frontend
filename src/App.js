// src/App.js
import React, { useState, Suspense, lazy } from 'react';
import { Rocket } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApodViewer = lazy(() => import('./components/ApodViewer'));
const MarsPhotos = lazy(() => import('./components/MarsPhotos'));
const EpicViewer = lazy(() => import('./components/EpicViewer'));
const NeoDashboard = lazy(() => import('./components/NeoDashboard'));
const ImageSearch = lazy(() => import('./components/ImageSearch'));

function App() {
    const [activeTab, setActiveTab] = useState('apod');

    return (
        <div className="min-vh-100 bg-dark text-white font-sans d-flex flex-column">
            <header className="p-4 shadow bg-opacity-75 bg-black sticky-top d-flex flex-column align-items-center">
                <h1 className="text-warning mb-3">
                    <Rocket className="me-2" /> NASA Explorer
                </h1>
                <nav className="nav nav-pills">
                    {['apod', 'mars', 'epic', 'neo', 'images'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`nav-link ${activeTab === tab ? 'active' : 'text-white'}`}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab === 'apod' && 'Astronomy Picture'}
                            {tab === 'mars' && 'Mars Rover Photos'}
                            {tab === 'epic' && 'EPIC Earth Images'}
                            {tab === 'neo' && 'Near Earth Objects'}
                            {tab === 'images' && 'NASA Image Library'}
                        </button>
                    ))}
                </nav>
            </header>

            <main className="container flex-grow-1 py-4">
                <Suspense fallback={<div className="text-center">Loading...</div>}>
                    {activeTab === 'apod' && <ApodViewer />}
                    {activeTab === 'mars' && <MarsPhotos />}
                    {activeTab === 'epic' && <EpicViewer />}
                    {activeTab === 'neo' && <NeoDashboard />}
                    {activeTab === 'images' && <ImageSearch />}
                </Suspense>
            </main>

            <footer className="text-center text-secondary py-3 border-top border-secondary mt-auto">
                © {new Date().getFullYear()} NASA Explorer — Built with <Rocket className="inline h-5 w-5 text-warning" /> by Niranjan
            </footer>
        </div>
    );
}

export default App;
