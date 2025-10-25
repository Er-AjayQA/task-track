import { useAuth } from "../../context/authContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <div className="mx-auto">
        <span>Welcome, {user?.firstName}</span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
