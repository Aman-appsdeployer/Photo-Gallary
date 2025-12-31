import { Route, Routes } from "react-router-dom";

import { ActiveTabProvider } from "./component/ActiveTabProvider.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";
import { ThemeProvider } from "./component/ThemeContext.jsx";

/* ================= PUBLIC COMPONENTS ================= */
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";

import Home from "./component/Pages/Home.jsx";
import Gallery from "./component/Pages/Gallery.jsx";
import AboutPage from "./component/Pages/About.jsx";
import Contact from "./component/Pages/Contact.jsx";
import OurProduct from "./component/Pages/OurProduct.jsx";
import Login from "./component/Pages/Login.jsx";
import Create from "./component/Pages/Create.jsx";

/* ================= CLIENT ================= */
import AlbumGallery from "./component/Pages/client/AlbumGallery.jsx";

/* ================= ADMIN COMPONENTS ================= */
import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Photographers from "./admin/Photographers.jsx";
import PhotographerView from "./admin/PhotographerView.jsx";
import PhotographerEdit from "./admin/PhotographerEdit.jsx";
import Albums from "./admin/Albums.jsx";
import AlbumView from "./admin/AlbumView.jsx";
import AlbumEdit from "./admin/AlbumEdit.jsx";
import UploadAlbum from "./admin/UploadAlbum.jsx";
import AddPhotographer from "./admin/AddPhotographer.jsx";

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

          {/* ================= CLIENT ALBUM (QR LINK) ================= */}
          <Route
            path="/album/:id"
            element={
              <PublicLayout>
                <AlbumGallery />
              </PublicLayout>
            }
          />

          {/* ================= ADMIN ROUTES (PROTECTED) ================= */}
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









// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// import { ActiveTabProvider } from "./component/ActiveTabProvider.jsx";
// import ProtectedRoute from "./component/ProtectedRoute.jsx";
// import { ThemeProvider } from "./component/ThemeContext.jsx";

// /* ================= PUBLIC COMPONENTS ================= */
// import Footer from "./component/Footer.jsx";
// import Navbar from "./component/Navbar.jsx";

// import AlbumEdit from "./admin/AlbumEdit.jsx";
// import AlbumView from "./admin/AlbumView.jsx";
// import AboutPage from "./component/Pages/About.jsx";
// import Contact from "./component/Pages/Contact.jsx";
// import Create from "./component/Pages/Create.jsx";
// import Gallery from "./component/Pages/Gallery.jsx";
// import Home from "./component/Pages/Home.jsx";
// import Login from "./component/Pages/Login.jsx";
// import OurProduct from "./component/Pages/OurProduct.jsx";

// /* ================= ADMIN COMPONENTS ================= */
// import AddPhotographer from "./admin/AddPhotographer.jsx";
// import AdminLayout from "./admin/AdminLayout.jsx";
// import Albums from "./admin/Albums.jsx";
// import Dashboard from "./admin/Dashboard.jsx";
// import PhotographerEdit from "./admin/PhotographerEdit.jsx";
// import Photographers from "./admin/Photographers.jsx";
// import PhotographerView from "./admin/PhotographerView.jsx";
// import UploadAlbum from "./admin/UploadAlbum.jsx";

// /* ================= CLIENT ================= */
// import AlbumGallery from "./component/Pages/client/AlbumGallery.jsx";

// /* ================= PUBLIC LAYOUT ================= */
// const PublicLayout = ({ children }) => (
//   <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
//     <Navbar />
//     <main className="flex-grow">{children}</main>
//     <Footer />
//   </div>
// );

// function App() {
//   return (
//     <ThemeProvider>
//       <ActiveTabProvider>
//         <Router>
//           <Routes>

//             {/* ================= PUBLIC ROUTES ================= */}
//             <Route
//               path="/"
//               element={
//                 <PublicLayout>
//                   <Home />
//                 </PublicLayout>
//               }
//             />

//             <Route
//               path="/gallery"
//               element={
//                 <PublicLayout>
//                   <Gallery />
//                 </PublicLayout>
//               }
//             />

//             <Route
//               path="/about"
//               element={
//                 <PublicLayout>
//                   <AboutPage />
//                 </PublicLayout>
//               }
//             />

//             <Route
//               path="/contact"
//               element={
//                 <PublicLayout>
//                   <Contact />
//                 </PublicLayout>
//               }
//             />

//             <Route
//               path="/our-product"
//               element={
//                 <PublicLayout>
//                   <OurProduct />
//                 </PublicLayout>
//               }
//             />

//             {/* ================= AUTH ================= */}
//             <Route
//               path="/login"
//               element={
//                 <PublicLayout>
//                   <Login />
//                 </PublicLayout>
//               }
//             />

//             <Route
//               path="/create"
//               element={
//                 <PublicLayout>
//                   <Create />
//                 </PublicLayout>
//               }
//             />

//             {/* ================= CLIENT ALBUM (QR ACCESS) ================= */}
//             <Route
//               path="/album/:id"
//               element={
//                 <PublicLayout>
//                   <AlbumGallery />
//                 </PublicLayout>
//               }
//             />

//             {/* ================= ADMIN ROUTES (PROTECTED) ================= */}
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute>
//                   <AdminLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<Dashboard />} />
//               <Route path="dashboard" element={<Dashboard />} />
//               <Route path="photographers" element={<Photographers />} />
//               <Route path="photographers/view/:id" element={<PhotographerView />} />
//               <Route path="photographers/edit/:id" element={<PhotographerEdit />} />
//               <Route path="albums" element={<Albums />} />
//               <Route path="upload-album" element={<UploadAlbum />} />
//               <Route path="add-photographer" element={<AddPhotographer />} />
//               <Route path="albums/view/:id" element={<AlbumView />} />
//               <Route path="albums/edit/:id" element={<AlbumEdit />} />
//             </Route>

//             {/* ================= FALLBACK ================= */}
//             <Route
//               path="*"
//               element={
//                 <PublicLayout>
//                   <Home />
//                 </PublicLayout>
//               }
//             />

//           </Routes>
//         </Router>
//       </ActiveTabProvider>
//     </ThemeProvider>
//   );
// }

// export default App;




