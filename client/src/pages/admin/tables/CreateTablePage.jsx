import { useState } from "react";
import api from "@/lib/api";
import { useToast } from "@/components/ui/toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function RegisterTable() {
  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { success, error: toastError } = useToast();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/admin/tables/create", {
        tableNumber,
        capacity,
      });

      setResult(data.data);
      success("Table registered successfully");
      setTableNumber("");
      setCapacity("");
    } catch (err) {
      toastError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" mt-1 mb-3">
        <Link
          to="/admin/tables"
          className="btn text-black bg-btn-black rounded-xl"
        >
            <ArrowLeft className="w-5 h-5 fill-text-main"/> 
        </Link>
      </div>
      <div className="max-w-lg mx-auto p-6 bg-card-bg shadow rounded-2xl text-text-main">
        <h2 className="text-xl font-semibold mb-4">Register Table</h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="number"
            placeholder="Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full border p-2 rounded-xl"
          />

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border p-2 rounded-xl"
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-xl"
          >
            {loading ? "Registering..." : "Register Table"}
          </button>
        </form>

        {result && (
          <div className="mt-6 text-center">
            <img src={result.qrImage} alt="QR Code" className="mx-auto" />
            <p className="mt-2 text-sm break-all">{result.qrCodeURL}</p>
          </div>
        )}
      </div>
    </>
  );
}
