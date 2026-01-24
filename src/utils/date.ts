/**
 * Date utility functions
 */

/**
 * Formats a date string to a relative time format (e.g., "2 months ago", "1 year ago")
 * @param dateString - ISO date string (e.g., "2025-12-01")
 * @returns Relative time string
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  }

  if (diffInMonths > 0) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }

  if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }

  return 'Today';
}

/**
 * Formats an end date to display format
 * @param dateEnded - End date string or 'Present'
 * @returns Formatted end date string
 */
export function formatEndDate(dateEnded: string | 'Present' | undefined): string {
  if (!dateEnded || dateEnded === 'Present') {
    return 'Present';
  }

  return new Date(dateEnded).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}
