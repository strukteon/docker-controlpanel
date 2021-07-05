export function readableSize(bytes) {
    if (Math.floor(bytes / 1e12) > 0)
        return `${Math.floor(bytes / 1e10) / 1e2} TB`
    if (Math.floor(bytes / 1e9) > 0)
        return `${Math.floor(bytes / 1e7) / 1e2} GB`
    if (Math.floor(bytes / 1e6) > 0)
        return `${Math.floor(bytes / 1e4) / 1e2} MB`
    if (Math.floor(bytes / 1e3) > 0)
        return `${Math.floor(bytes / 1e1) / 1e2} KB`
    return `${Math.floor(bytes / 1e1) / 1e2} B`
}

export function readableDateDiff(date) {
    if (typeof date == "string") date = Date.parse(date);
    let diff = (Date.now() - date) / 1000;
    let years = Math.abs(Math.round(diff / (365 * 24 * 60 * 60))),
        months = Math.abs(Math.round(diff / (4 * 7 * 24 * 60 * 60))),
        days = Math.abs(Math.round(diff / (24 * 60 * 60))),
        hours = Math.abs(Math.round(diff / (60 * 60))),
        minutes = Math.abs(Math.round(diff / (60))),
        seconds = Math.abs(Math.round(diff));

    if (years > 0)
        return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0)
        return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0)
        return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0)
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0)
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (seconds > 0)
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
}

export function getApiUrl() {
    return 'localhost:80';
}
