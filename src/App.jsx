import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ActiveTabProvider } from "./component/ActiveTabProvider.jsx";
import Footer from "./component/Footer.jsx";
import Navbar from "./component/Navbar.jsx";
import AboutPage from "./component/Pages/About.jsx";
import Contact from "./component/Pages/Contact.jsx";
import Create from "./component/Pages/Create.jsx";
import Gallery from "./component/Pages/Gallery.jsx";
import Home from "./component/Pages/home.jsx";
import Login from "./component/Pages/Login.jsx";
import Profile from "./component/Pages/Profile.jsx";

import { ThemeProvider } from "./component/ThemeContext.jsx";

/* Use the AboutPage stub (empty) you requested earlier */
const About = () => <AboutPage />;

/* Layout (navbar + main + footer) */
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <ActiveTabProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />

              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />

              {/* fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </ActiveTabProvider>
    </ThemeProvider>
  );
}


export default App;
