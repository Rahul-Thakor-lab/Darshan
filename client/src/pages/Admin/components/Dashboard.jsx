import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faClipboardList,
  faGlobe,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

const bookingsData = [
  { name: "Jan", bookings: 30 },
  { name: "Feb", bookings: 45 },
  { name: "Mar", bookings: 60 },
  { name: "Apr", bookings: 50 },
  { name: "May", bookings: 70 },
  { name: "Jun", bookings: 85 },
];

const topTours = [
  { name: "Somnath", visitors: 1200 },
  { name: "Dwarka", visitors: 950 },
  { name: "Rameshwaram", visitors: 800 },
  { name: "Ayodhya", visitors: 1500 },
];

export default function Dashboard({ user }) {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome, {user?.Name || "Admin"}!
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Here’s a quick overview of your system performance.
          </p>
        </header>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <StatCard
            title="Total Users"
            value="120"
            icon={<FontAwesomeIcon icon={faUsers} />}
            color="blue"
          />
          <StatCard
            title="Total Bookings"
            value="85"
            icon={<FontAwesomeIcon icon={faClipboardList} />}
            color="green"
          />
          <StatCard
            title="Active Tours"
            value="25"
            icon={<FontAwesomeIcon icon={faGlobe} />}
            color="yellow"
          />
          <StatCard
            title="Total Revenue"
            value="$12,540"
            icon={<FontAwesomeIcon icon={faChartLine} />}
            color="indigo"
          />
        </div>

        {/* Chart & Top Tours */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Bookings Chart */}
          <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Bookings Overview
            </h2>
            <div className="w-full h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="bookings"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Tours List */}
          <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Top Visited Tours
            </h2>
            <ul className="space-y-4">
              {topTours
                .sort((a, b) => b.visitors - a.visitors)
                .map((tour, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b last:border-none pb-3"
                  >
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium text-gray-800">{tour.name}</p>
                      <p className="text-sm text-gray-500">
                        {tour.visitors.toLocaleString()} Visitors
                      </p>
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-600">
                      #{index + 1}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };

  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between sm:justify-start">
      <div className={`p-3 sm:p-4 text-xl rounded-full ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="ml-3 sm:ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};
