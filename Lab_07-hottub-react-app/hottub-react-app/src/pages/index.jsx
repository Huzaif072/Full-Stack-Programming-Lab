import SiteLayout from '../components/layout/SiteLayout';
import HomeTopSections from '../components/pages/home/HomeTopSections';
import HomeAlsoViewedSection from '../components/pages/home/HomeAlsoViewedSection';

function HomePage() {
  return (
    <SiteLayout>
      <main>
        <HomeTopSections />
        <HomeAlsoViewedSection />
      </main>
    </SiteLayout>
  );
}

export default HomePage;
