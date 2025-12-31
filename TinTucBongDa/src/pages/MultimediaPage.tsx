import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { FaPlay } from 'react-icons/fa';
import '../scss/MultimediaPage.scss'; 
import { getYouTubeID, getYouTubeThumbnail } from '../utils/youtubeUtils';

interface Video {
    _id: string;
    title: string;
    link: string;
    duration: string;
}

interface CategorySection {
    _id: string;
    name: string; 
    slug: string;
    videos: Video[];
}

const MultimediaPage = () => {
    const [sections, setSections] = useState<CategorySection[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res: any = await axiosClient.get('/videos/grouped');
                setSections(res.data || res);
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="multimedia-page-container">
            <div className="page-main-header">
                <h1>KHO VIDEO BÓNG ĐÁ</h1>
            </div>

            {sections.map((section) => (
                <div key={section._id} className="category-section">
                        <div className="section-header">
                        <h2>{section.name}</h2>
                        <div className="line"></div>
                        <div className="plus-icon">+</div>
                    </div>

                    {/* Grid Video */}
                    <div className="video-grid">
                        {section.videos.map((video) => {
                            const vidId = getYouTubeID(video.link);
                            return (
                                <div key={video._id} className="video-card">
                                    <div className="thumb-wrapper">
                                        <img src={getYouTubeThumbnail(vidId)} alt={video.title} />
                                        <div className="duration-badge">{video.duration}</div>
                                        
                                        <a href={video.link} target="_blank" rel="noreferrer" className="play-overlay">
                                            <FaPlay />
                                        </a>
                                    </div>
                                    <div className="video-info">
                                        <h3>
                                            <a href={video.link} target="_blank" rel="noreferrer">{video.title}</a>
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MultimediaPage;