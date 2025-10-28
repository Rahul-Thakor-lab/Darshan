import { FaMountain, FaWater, FaBicycle, FaParachuteBox } from "react-icons/fa";

export default function AdventureCategories() {
  const categories = [
    { name: "Trekking", icon: <FaMountain size={40} className="text-orange-500" /> },
    { name: "Rafting", icon: <FaWater size={40} className="text-orange-500" /> },
    { name: "Biking", icon: <FaBicycle size={40} className="text-orange-500" /> },
    { name: "Skydiving", icon: <FaParachuteBox size={40} className="text-orange-500" /> },
  ];

  return (
    <section className="py-10">
      <h2 className="text-4xl font-bold mb-16 text-center">Adventure Categories</h2>
      <div className="flex items-center justify-around gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 px-24 rounded-xl shadow-md hover:shadow-lg transition bg-white cursor-pointer"
          >
            {cat.icon}
            <p className="mt-3 text-lg font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
