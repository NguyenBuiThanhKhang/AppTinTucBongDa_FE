import React, { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import axiosClient from '../api/axiosClient';
import '../scss/Multimedia.scss';
import { getYouTubeID, getYouTubeThumbnail } from '../utils/youtubeUtils';
import { Link } from 'react-router-dom';

interface Video {
    _id: string;
    title: string;
    link: string;
    duration: string;
    category: string;
    description: string;
}

const MultimediaSection = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [currentVideo, setCurrentVideo] = useState<Video | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res: any = await axiosClient.get('/videos');
                
                const videoData = res.data || res;
                setVideos(videoData);

                if (videoData.length > 0) {
                    setCurrentVideo(videoData[0]);
                }
            } catch (error) {
                console.error("Lỗi tải video:", error);
            }
        };

        fetchVideos();
    }, []);

    if (!currentVideo && videos.length === 0) return null;

    const videoId = currentVideo ? getYouTubeID(currentVideo.link) : null;

    return (
        <div className="multimedia-container">
            <div className="multimedia-inner">
                
                <div className="mm-header-row" style={{marginBottom: '20px'}}>
                    <div className="mm-header">
                        <h2>Multimedia</h2>
                        <div className="mm-line"></div>
                        <Link to="/multimedia" className="mm-plus" title="Xem tất cả">
                            +
                        </Link>
                    </div>
                </div>

                <div className="mm-content">
                    <div className="mm-featured">
                        {videoId ? (
                            <iframe
                                width="100%" height="400"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                                title={currentVideo?.title}
                                frameBorder="0" allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                style={{ borderRadius: '4px' }}
                            ></iframe>
                        ) : (
                            <div className="video-error">Không có video</div>
                        )}
                        
                        {currentVideo && (
                            <div className="featured-info">
                                <h3>{currentVideo.title}</h3>
                                <p style={{fontSize: '13px', color: '#ccc', marginTop: '5px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                                    {currentVideo.description}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mm-list">
                        {videos.map((video) => {
                            const vidId = getYouTubeID(video.link);
                            const isActive = currentVideo && video._id === currentVideo._id;

                            return (
                                <div 
                                    key={video._id} 
                                    className={`mm-item ${isActive ? 'active' : ''}`}
                                    onClick={() => setCurrentVideo(video)}
                                >
                                    <div className="thumb-wrapper">
                                        <img src={getYouTubeThumbnail(vidId)} alt={video.title} />
                                        <div className="play-icon-small">
                                            <FaPlay size={8} /> {video.duration || "Video"}
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <h4>{video.title}</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultimediaSection;