import useTours from "./useTours";
import ToursTable from "./toursTable";
import TourFormModal from "./TourFormModal";
import ViewTourModal from "./ViewTourModel";
import { useState } from "react";
import API_BASE_URL from "../../../config/api";

export default function ManageTours() {
  const {
    filteredTours,
    getAllTours,
    handleSearch,
    handleSort,
    searchTerm,
  } = useTours();

  const [isShowAddModal, setisShowAddModal] = useState(false);
  const [isShowEditModal, setisShowEditModal] = useState(false);
  const [isShowDetails, setisShowDetails] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    startLocation: "",
    duration: "",
    pricePerPerson: "",
    includes: [""],
    excludes: [""],
    hotels: [""],
    existingImages: [],
    newImages: [],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      startLocation: "",
      duration: "",
      pricePerPerson: "",
      includes: [""],
      excludes: [""],
      hotels: [""],
      existingImages: [],
      newImages: [],
    });
  };

  const handleEdit = (tour) => {
    setFormData({
      name: tour.name || "",
      startLocation: tour.startLocation || "",
      duration: tour.duration || "",
      pricePerPerson: tour.pricePerPerson || "",
      includes: tour.includes || [""],
      excludes: tour.excludes || [""],
      hotels: tour.hotels || [""],
      existingImages: tour.images || [],
      newImages: [],
    });
    setSelectedTour(tour);
    setisShowEditModal(true);
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // ---------- Add Tour ----------
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("startLocation", formData.startLocation);
      formPayload.append("duration", formData.duration);
      formPayload.append("pricePerPerson", formData.pricePerPerson);

      ["includes", "excludes", "hotels"].forEach((field) =>
        formData[field].forEach((item) => formPayload.append(field, item))
      );

      formData.newImages.forEach((img) => {
        if (img instanceof File) formPayload.append("images", img);
      });

      const res = await fetch(`${API_BASE_URL}/tours`, {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) throw new Error("Failed to add tour");
      alert("Tour added successfully!");
      setisShowAddModal(false);
      resetForm();
      getAllTours();
    } catch (err) {
      console.error(err);
      alert("Error adding tour");
    }
  };

  // ---------- Edit Tour ----------
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("startLocation", formData.startLocation);
      formPayload.append("duration", formData.duration);
      formPayload.append("pricePerPerson", formData.pricePerPerson);

      ["includes", "excludes", "hotels"].forEach((field) =>
        formData[field].forEach((item) => formPayload.append(field, item))
      );

      formData.existingImages.forEach((img) =>
        formPayload.append("existingImages[]", img.split("/").pop())
      );

      formData.newImages.forEach((img) => {
        if (img instanceof File) formPayload.append("images", img);
      });

      const res = await fetch(
        `${API_BASE_URL}/tours/${selectedTour._id}`,
        { method: "PUT", body: formPayload }
      );

      if (!res.ok) throw new Error("Failed to update tour");

      alert("Tour updated successfully!");
      setisShowEditModal(false);
      resetForm();
      getAllTours();
    } catch (err) {
      console.error(err);
      alert("Error updating tour");
    }
  };

  // ---------- Delete Tour ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/tours/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete tour");
      alert("Tour deleted successfully!");
      getAllTours();
    } catch (err) {
      console.error(err);
      alert("Error deleting tour");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 rounded-xl shadow-sm w-full overflow-x-auto">
      {/* Header + Search */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center lg:text-left">
          Manage Tours
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tour..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-48"
          />
          <select
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-40"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
            onClick={() => {
              resetForm();
              setisShowAddModal(true);
            }}
          >
            + Add Tour
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <ToursTable
          filteredTours={filteredTours}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleView={(t) => {
            setSelectedTour(t);
            setisShowDetails(true);
          }}
        />
      </div>

      {/* Modals */}
      {isShowAddModal && (
        <TourFormModal
          show={isShowAddModal}
          onClose={() => setisShowAddModal(false)}
          formData={formData}
          setFormData={setFormData}
          mode="add"
          handleArrayChange={handleArrayChange}
          addArrayField={addArrayField}
          onSubmit={handleSubmitAdd}
        />
      )}

      {isShowEditModal && (
        <TourFormModal
          show={isShowEditModal}
          onClose={() => setisShowEditModal(false)}
          formData={formData}
          setFormData={setFormData}
          mode="edit"
          handleArrayChange={handleArrayChange}
          addArrayField={addArrayField}
          onSubmit={handleSubmitEdit}
        />
      )}

      {isShowDetails && (
        <ViewTourModal
          tour={selectedTour}
          onClose={() => setisShowDetails(false)}
        />
      )}
    </div>
  );
}
