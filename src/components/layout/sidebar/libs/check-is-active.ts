/**
 * Checks if a navigation item is active based on the current pathname
 *
 * @param pathname - Current pathname from Next.js usePathname()
 * @param item - Navigation item to check
 * @param mainNav - Whether this is a main navigation item
 * @returns Boolean indicating if the item is active
 */
export default function checkIsActive(
  pathname: string,
  item: NavItem,
  mainNav = false
) {
  // For NavCollapsible type (items array exists)
  if ('items' in item && Array.isArray(item.items)) {
    // Check if any child items are active
    return item.items.some((childItem) => childItem.url === pathname);
  }

  // For NavLink type (url exists)
  if ('url' in item && item.url) {
    return (
      pathname === item.url || // Exact match
      (pathname.includes('?') && pathname.split('?')[0] === item.url) || // Match without query params
      // For main nav items, check if they share the same first path segment
      (mainNav &&
        pathname.split('/')[1] !== '' &&
        pathname.split('/')[1] === item.url.split('/')[1])
    );
  }

  return false;
}
