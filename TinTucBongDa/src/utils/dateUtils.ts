export const timeAgo = (dateString?: string): string => {
    if (!dateString) return "Mới cập nhật";

    const date = new Date(dateString);

    // Kiểm tra ngày không hợp lệ
    if (isNaN(date.getTime())) return "Mới cập nhật";

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // Xử lý các mốc thời gian
    if (seconds < 60) return "Vừa xong";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút trước`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ngày trước`;
    return date.toLocaleDateString('vi-VN');
};

export const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('vi-VN');
};