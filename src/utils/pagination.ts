/**
 * Calculates which page numbers should be visible in pagination controls.
 * 
 * @param pageIndex - The current page index (0-based)
 * @param pageCount - The total number of pages
 * @param maxVisible - Maximum number of page buttons to show (default: 4)
 * @returns Array of page indices (0-based) to display
 */
export function getVisiblePages(
  pageIndex: number,
  pageCount: number,
  maxVisible: number = 4
): number[] {
  if (pageCount <= maxVisible) {
    return Array.from({ length: pageCount }, (_, i) => i);
  }
  
  // Determine start page based on current position
  let start: number;
  if (pageIndex < 2) {
    // Near start: show first pages
    start = 0;
  } else if (pageIndex > pageCount - 3) {
    // Near end: show last pages
    start = pageCount - maxVisible;
  } else {
    // Middle: show current page with one before and two after
    start = pageIndex - 1;
  }
  
  return Array.from({ length: maxVisible }, (_, i) => start + i);
}
