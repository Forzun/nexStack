
export function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        }
    }

    return seconds < 60 ? "just now" : `${seconds} seconds ago`;
}


export function isoString(date: string){
    return  date.split('T')[0];
}

