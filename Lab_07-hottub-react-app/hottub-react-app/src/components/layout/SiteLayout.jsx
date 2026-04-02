import TopBar from './TopBar';
import HeaderBar from './HeaderBar';
import MainNav from './MainNav';
import SiteFooter from './SiteFooter';

function SiteLayout({ children }) {
  return (
    <div className="bg-white">
      <TopBar />
      <HeaderBar />
      <MainNav />
      {children}
      <SiteFooter />
    </div>
  );
}

export default SiteLayout;
