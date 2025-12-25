import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Footer } from './Footer';
const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
