export default function LogoutTab({ onLogout }) {
  return (
    <div>
      <p className="text-2xl mb-6">Are you sure you want to sign out?</p>
      <button
        className="text-left font-medium text-white px-4 py-2 border rounded-lg bg-red-500 hover:bg-red-600"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}
