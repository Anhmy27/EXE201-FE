export const timeAgo = (timestamp) => {
    const date = new Date(timestamp * 1000); // Chuyển timestamp (seconds) -> milliseconds
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    for (const unit in intervals) {
        const interval = intervals[unit];
        if (diffInSeconds >= interval || unit === 'second') {
            const count = Math.floor(diffInSeconds / interval);
            return rtf.format(-count, unit);
        }
    }
};

export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return ` ${hours}:${minutes} ${day}/${month}/${year}`;
};

export const formatMoney = (so) => {
    if (so >= 1_000_000_000) return (so / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + "B";
    if (so >= 1_000_000) return (so / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
    if (so >= 1_000) return (so / 1_000).toFixed(1).replace(/\.0$/, '') + "K";
    return so.toString();
};



export const getPreviewUrl = (file) => {
    if (!file) {
        return null;
    }
    let root_url = import.meta.env.VITE_BASE_URL || '';
    return root_url + file;
};

export function formatNumberWithCommas(number) {
    if (typeof number !== "number") {
        number = parseFloat(number); // Chuyển chuỗi thành số nếu cần
        if (isNaN(number)) return number; // Nếu không phải số, trả về nguyên giá trị
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

export const pageNotFound = (router) =>{
    router.push('/notfound');

}

export const extractMentionStrings = (content) => {
    const matches = [...content.matchAll(/\[(.*?)\]\(\/profile\/(.*?)\)/g)];
    const mentionStrings = matches.map(match => match[2]);
    return [...new Set(mentionStrings)];
};