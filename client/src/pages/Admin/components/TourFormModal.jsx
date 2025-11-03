export default function TourFormModal({
  show,
  onClose,
  formData,
  setFormData,
  onSubmit,
  mode = "add", // "add" or "edit"
  handleArrayChange,
  addArrayField,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30 px-2 sm:px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg relative p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-900 text-2xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 text-center sm:text-left">
          {mode === "add" ? "Add New Tour" : "Edit Tour"}
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Basic Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["name", "startLocation", "duration", "pricePerPerson"].map((field) => (
              <input
                key={field}
                type={field === "pricePerPerson" ? "number" : "text"}
                placeholder={
                  field === "pricePerPerson"
                    ? "Price per person"
                    : field.replace(/([A-Z])/g, " $1")
                }
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm sm:text-base"
                required
              />
            ))}
          </div>

          {/* Dynamic Fields */}
          {["includes", "excludes", "hotels", "images"].map((field) => (
            <div key={field} className="mb-4">
              <label className="font-semibold text-gray-700 capitalize text-sm sm:text-base">
                {field}
              </label>

              {field === "images" ? (
                <>
                  {/* Upload New Images */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setFormData({
                        ...formData,
                        newImages: [...formData.newImages, ...files],
                      });
                    }}
                    className="border w-full p-2 rounded-lg mt-1 text-sm"
                  />

                  {/* Image Preview Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                    {/* Existing Images */}
                    {formData.existingImages.map((img, idx) => (
                      <div key={`existing-${idx}`} className="relative group">
                        <img
                          src={img}
                          alt={`existing-${idx}`}
                          className="w-full h-24 object-cover rounded-lg shadow"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          onClick={() => {
                            const updated = [...formData.existingImages];
                            updated.splice(idx, 1);
                            setFormData({
                              ...formData,
                              existingImages: updated,
                            });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}

                    {/* New Images */}
                    {formData.newImages.map((img, idx) => (
                      <div key={`new-${idx}`} className="relative group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`new-${idx}`}
                          className="w-full h-24 object-cover rounded-lg shadow"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          onClick={() => {
                            const updated = [...formData.newImages];
                            updated.splice(idx, 1);
                            setFormData({
                              ...formData,
                              newImages: updated,
                            });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {formData[field].map((val, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-1"
                    >
                      <input
                        type="text"
                        placeholder={`${field} ${i + 1}`}
                        value={val}
                        onChange={(e) =>
                          handleArrayChange(field, i, e.target.value)
                        }
                        className="border w-full p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                      />
                      <button
                        type="button"
                        className="text-red-500 font-semibold px-2 py-1 rounded-lg hover:bg-red-100 w-full sm:w-auto"
                        onClick={() => {
                          const updated = [...formData[field]];
                          updated.splice(i, 1);
                          setFormData({ ...formData, [field]: updated });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-indigo-600 mt-1 text-sm hover:underline"
                    onClick={() => addArrayField(field)}
                  >
                    + Add more {field}
                  </button>
                </>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
            >
              {mode === "add" ? "Add Tour" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
