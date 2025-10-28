import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// Step 2.1: Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboardList, faGlobe, faChartLine } from '@fortawesome/free-solid-svg-icons';


// Sample data for the chart - replace with your actual data
const bookingsData = [
  { name: 'Jan', bookings: 30 },
  { name: 'Feb', bookings: 45 },
  { name: 'Mar', bookings: 60 },
  { name: 'Apr', bookings: 50 },
  { name: 'May', bookings: 70 },
  { name: 'Jun', bookings: 85 },
];

// Sample data for top tours - replace with your actual data
const topTours = [
    { name: 'Somnath', visitors: 1200 },
    { name: 'Dwarka', visitors: 950 },
    { name: 'Rameshwaram', visitors: 800 },
    { name: 'Ayodhya', visitors: 1500 },
];


export default function Dashboard({ user }) {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.Name || "Admin"}!</h1>
          <p className="text-gray-500 mt-1">Here’s a quick overview of your system performance.</p>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Step 2.2: Use the FontAwesomeIcon component */}
          
          {/* Total Users Card */}
          <StatCard 
            title="Total Users" 
            value="120" 
            icon={<FontAwesomeIcon icon={faUsers} />}
            color="blue"
          />
          {/* Total Bookings Card */}
          <StatCard 
            title="Total Bookings" 
            value="85" 
            icon={<FontAwesomeIcon icon={faClipboardList} />}
            color="green"
          />
          {/* Active Tours Card */}
          <StatCard 
            title="Active Tours" 
            value="25" 
            icon={<FontAwesomeIcon icon={faGlobe} />}
            color="yellow"
          />
          {/* Revenue Card */}
          <StatCard 
            title="Total Revenue" 
            value="$12,540" 
            icon={<FontAwesomeIcon icon={faChartLine} />}
            color="indigo"
          />
        </div>

        {/* Main Content Area (Chart and Lists) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Bookings Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Bookings Overview</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip wrapperClassName="rounded-md shadow-lg" />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Visited Tours */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Visited Tours</h2>
            <ul className="space-y-4">
              {topTours.sort((a, b) => b.visitors - a.visitors).map((tour, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{tour.name}</p>
                    <p className="text-sm text-gray-500">{tour.visitors.toLocaleString()} Visitors</p>
                  </div>
                  <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        yellow: 'bg-yellow-100 text-yellow-600',
        indigo: 'bg-indigo-100 text-indigo-600',
    };
    // The FontAwesomeIcon automatically picks up text color, so no changes needed here.
    // The h-6 w-6 classes are not needed as Font Awesome handles sizing.
    return (
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center">
            <div className={`p-4 text-xl rounded-full ${colorClasses[color]}`}>
                {icon}
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};
