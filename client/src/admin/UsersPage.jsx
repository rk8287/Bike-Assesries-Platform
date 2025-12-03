import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../slices/userSlice";

function UsersPage() {
  const dispatch = useDispatch();
  const { items: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Registered Users
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <>
          {/* ================= TABLE FOR LARGE SCREENS ================= */}
          <div className="hidden md:block bg-white shadow-lg rounded-2xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 font-medium text-gray-700">Name</th>
                  <th className="p-4 font-medium text-gray-700">Email</th>
                  <th className="p-4 font-medium text-gray-700">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= CARDS FOR MOBILE ================= */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                  <span className="text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 break-all">{user.email}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersPage;
