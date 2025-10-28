import maintenance from '../../assets/maintenance.png';

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center px-6">
      <img
        src={maintenance}
        alt="Site Under Maintenance"
        className="w-72 md:w-96 mb-8"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
        This site is under maintenance
      </h1>
      <p className="text-gray-600 text-lg md:text-xl">
        We’re preparing to serve you better.
      </p>
    </div>
  );
}
