import { Route, Routes } from "react-router-dom";

import { ActiveTabProvider } from "./components/ActiveTabProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeContext";

/* ================= PUBLIC COMPONENTS ================= */
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

/* ================= PAGES ================= */
import AboutPage from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Create from "./components/Pages/Create";
import Gallery from "./components/Pages/Gallery";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import OurProduct from "./components/Pages/OurProduct";

/* ================= CLIENT ================= */
import AlbumGallery from "./components/Pages/client/AlbumGallery";

/* ================= ADMIN COMPONENTS ================= */
import AddPhotographer from "./admin/AddPhotographer";
import AdminLayout from "./admin/AdminLayout";
import AlbumEdit from "./admin/AlbumEdit";
import Albums from "./admin/Albums";
import AlbumView from "./admin/AlbumView";
import Dashboard from "./admin/Dashboard";
import PhotographerEdit from "./admin/PhotographerEdit";
import Photographers from "./admin/Photographers";
import PhotographerView from "./admin/PhotographerView";
import UploadAlbum from "./admin/UploadAlbum";

/* ================= PUBLIC LAYOUT ================= */
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ActiveTabProvider>
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

          <Route
            path="/gallery"
            element={
              <PublicLayout>
                <Gallery />
              </PublicLayout>
            }
          />

          <Route
            path="/about"
            element={
              <PublicLayout>
                <AboutPage />
              </PublicLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <PublicLayout>
                <Contact />
              </PublicLayout>
            }
          />

          <Route
            path="/our-product"
            element={
              <PublicLayout>
                <OurProduct />
              </PublicLayout>
            }
          />

          <Route
            path="/login"
            element={
              <PublicLayout>
                <Login />
              </PublicLayout>
            }
          />

          <Route
            path="/create"
            element={
              <PublicLayout>
                <Create />
              </PublicLayout>
            }
          />

          {/* ================= CLIENT ALBUM ================= */}
          <Route
            path="/album/:id"
            element={
              <PublicLayout>
                <AlbumGallery />
              </PublicLayout>
            }
          />

          {/* ================= ADMIN ROUTES ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="photographers" element={<Photographers />} />
            <Route path="photographers/view/:id" element={<PhotographerView />} />
            <Route path="photographers/edit/:id" element={<PhotographerEdit />} />
            <Route path="albums" element={<Albums />} />
            <Route path="albums/view/:id" element={<AlbumView />} />
            <Route path="albums/edit/:id" element={<AlbumEdit />} />
            <Route path="upload-album" element={<UploadAlbum />} />
            <Route path="add-photographer" element={<AddPhotographer />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />

        </Routes>
      </ActiveTabProvider>
    </ThemeProvider>
  );
}

export default App;
