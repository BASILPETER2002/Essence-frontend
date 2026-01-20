import Navbar from './Navbar';
import Footer from './Footer';

const CustomerLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-cream font-sans">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
