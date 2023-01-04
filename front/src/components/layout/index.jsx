import { h } from 'preact';

const NOT_MAIN_PAGES = ['/login'];

const notMainPages = currentUrl => {
  const found = NOT_MAIN_PAGES.find(page => {
    return currentUrl.startsWith(page);
  });
  if (found) {
    return true;
  }
  return false;
};

const Layout = ({ children, ...props }) => <div class="page">{children}</div>;

export default Layout;
