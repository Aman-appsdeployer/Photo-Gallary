import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function AlbumEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    album_name: "",
    client_name: "",
    event_date: "",
  });

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

        setForm({
          album_name: data.album_name || "",
          client_name: data.client_name || "",
          event_date: data.event_date
            ? data.event_date.split("T")[0]
            : "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${API_BASE_URL}/api/albums/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      navigate(`/admin/albums/view/${id}`);
    } catch (err) {
      alert("Failed to update album");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h2 className="text-2xl font-bold mb-6">Update Album</h2>

      <div className="space-y-5">
        <div>
          <label className="text-sm font-medium">Album Name</label>
          <input
            name="album_name"
            value={form.album_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Client Name</label>
          <input
            name="client_name"
            value={form.client_name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Event Date</label>
          <input
            type="date"
            name="event_date"
            value={form.event_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-emerald-400 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
}
