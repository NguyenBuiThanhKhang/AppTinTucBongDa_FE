export const getYouTubeID = (url: string | undefined): string | null => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
};

export const getYouTubeThumbnail = (videoId: string | null): string => {
    if (!videoId) {
        return "https://via.placeholder.com/640x360?text=No+Thumbnail";
    }
    
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};