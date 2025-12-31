import { ArrowLeft, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function AlbumView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const res = await fetch(
          `${API_BASE_URL}/api/albums/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to load album");

        const data = await res.json();
        setAlbum(data);
      } catch (err) {
        console.error("Album fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  if (loading) {
    return <p className="p-10 text-gray-500">Loading album...</p>;
  }

  if (!album) {
    return <p className="p-10 text-red-500">Album not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-purple-400 rounded-xl flex items-center justify-center">
          <Image />
        </div>

        <div>
          <h2 className="text-3xl font-bold">{album.album_name}</h2>
          <p className="text-gray-500">
            Photographer: {album.photographer_name || "—"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-sm text-gray-400">Client</p>
          <p className="font-medium">{album.client_name || "—"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Event Date</p>
          <p className="font-medium">
            {album.event_date
              ? new Date(album.event_date).toLocaleDateString()
              : "—"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Created At</p>
          <p className="font-medium">
            {album.created_at
              ? new Date(album.created_at).toLocaleDateString()
              : "—"}
          </p>
        </div>
      </div>

      {album.qr_url && (
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-3">Client QR Code</p>
          <img
            src={album.qr_url}
            alt="Album QR Code"
            className="w-40 h-40 border rounded-xl"
          />
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold mb-4">Album Photos</h3>

        {album.images && album.images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {album.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Album ${i}`}
                className="w-full h-36 object-cover rounded-xl shadow"
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No photos uploaded.</p>
        )}
      </div>
    </div>
  );
}
