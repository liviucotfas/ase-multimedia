/**
 * Format a time value in seconds as mm:ss.
 * @param {number} seconds Seconds to format.
 * @returns {string} Formatted time, or ellipsis when not finite.
 */
export function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return '...';
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}