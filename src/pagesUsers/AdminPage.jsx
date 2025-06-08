import { useState, useEffect } from "react";
import {
  getAdminStats,
  getAllUsers,
  activateUser,
  deactivateUser,
  deleteUser,
  updateUserRole,
} from "../services/apiAdmin";

function AdminPage() {
  const isAuthenticated = !!localStorage.getItem("authToken");

  // State to store statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProblems: 0,
    totalSubmissions: 0,
    activeUsers: 0,
  });

  // State for user management
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // State to control loading
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);

  // State to handle errors
  const [error, setError] = useState(null);
  const [usersError, setUsersError] = useState(null);

  // State for role changes
  const [roleChangeLoading, setRoleChangeLoading] = useState({});

  // Role mappings based on your database
  const ROLES = {
    1: { name: "Estudiante", color: "bg-blue-100 text-blue-800" },
    2: { name: "Administrador", color: "bg-purple-100 text-purple-800" },
    3: { name: "Maestro", color: "bg-orange-100 text-orange-800" },
  };

  // Function to get role color based on role name
  const getRoleColor = (roleName) => {
    if (!roleName) return "bg-gray-100 text-gray-800";

    const name = roleName.toLowerCase();
    if (name.includes("administrador")) {
      return "bg-purple-100 text-purple-800";
    } else if (name.includes("maestro")) {
      return "bg-orange-100 text-orange-800";
    } else if (name.includes("estudiante")) {
      return "bg-blue-100 text-blue-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  // Function to format role name
  const formatRoleName = (roleName) => {
    if (!roleName) return "Usuario";
    return roleName.charAt(0).toUpperCase() + roleName.slice(1);
  };

  // Function to load statistics from the API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check authentication
        if (!isAuthenticated) {
          throw new Error("User not authenticated");
        }

        // Use the service function that includes authentication
        const calculatedStats = await getAdminStats();
        setStats(calculatedStats);
      } catch (err) {
        console.error("Error loading stats:", err);
        setError(`Failed to load stats: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated]);

  // Function to load users
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setUsersError(null);

      const usersData = await getAllUsers();
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (err) {
      console.error("Error loading users:", err);
      setUsersError(`Error 404: Not Found`);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  // Filter users when search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.username?.toLowerCase().includes(lowercasedSearch) ||
          user.email?.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle user status toggle
  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      if (currentStatus) {
        await deactivateUser(userId);
      } else {
        await activateUser(userId);
      }
      fetchUsers(); // Refresh users list
    } catch (err) {
      console.error("Error updating user status:", err);
      alert("Error updating user status");
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        fetchUsers(); // Refresh users list
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Error deleting user");
      }
    }
  };

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      console.log(
        "Attempting to change role for user:",
        userId,
        "to role:",
        newRole
      );

      setRoleChangeLoading((prev) => ({ ...prev, [userId]: true }));

      const result = await updateUserRole(userId, Number.parseInt(newRole));
      console.log("Role change result:", result);

      fetchUsers(); // Refresh users list
      alert("Role updated successfully!");
    } catch (err) {
      console.error("Error updating user role:", err);
      alert(`Error updating user role: ${err.message}`);
    } finally {
      setRoleChangeLoading((prev) => ({ ...prev, [userId]: false }));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">
            <strong>Error:</strong> You must be logged in to access the admin
            panel.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <button
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          onClick={() => {
            window.location.reload();
          }}
        >
          Refresh
        </button>
      </div>

      {/* Error message if present */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Statistic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card: Total Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
              )}
            </div>
            <div className="text-blue-600">👥</div>
          </div>
        </div>

        {/* Card: Total Problems */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Problems
              </p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalProblems}
                </p>
              )}
            </div>
            <div className="text-green-600">📄</div>
          </div>
        </div>

        {/* Card: Total Submissions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Submissions
              </p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalSubmissions}
                </p>
              )}
            </div>
            <div className="text-purple-600">📊</div>
          </div>
        </div>

        {/* Card: Active Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              {loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeUsers}
                </p>
              )}
            </div>
            <div className="text-yellow-600">🏆</div>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          User Management
        </h2>

        {/* Users Error message if present */}
        {usersError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <div className="text-red-800">
              <strong>Error:</strong> {usersError}
            </div>
          </div>
        )}

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Users table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Problems
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.codUser} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          ROLES[user.codRole]?.color ||
                          getRoleColor(user.rolUsuario?.name)
                        }`}
                      >
                        {ROLES[user.codRole]?.name ||
                          formatRoleName(user.rolUsuario?.name)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalProblemsSolved || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-2">
                        {/* Role Change Button */}
                        <div className="flex items-center space-x-2">
                          <select
                            onChange={(e) => {
                              if (
                                e.target.value &&
                                e.target.value !== user.codRole.toString()
                              ) {
                                handleRoleChange(user.codUser, e.target.value);
                                e.target.value = ""; // Reset dropdown
                              }
                            }}
                            disabled={roleChangeLoading[user.codUser]}
                            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                            defaultValue=""
                          >
                            <option value="">🔄 Change role</option>
                            {Object.entries(ROLES).map(
                              ([roleId, role]) =>
                                Number.parseInt(roleId) !== user.codRole && (
                                  <option key={roleId} value={roleId}>
                                    {role.name}
                                  </option>
                                )
                            )}
                          </select>
                          {roleChangeLoading[user.codUser] && (
                            <div className="flex items-center text-xs text-blue-600">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-1"></div>
                              Updating...
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleStatusToggle(user.codUser, user.isActive)
                            }
                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                              user.isActive
                                ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border border-yellow-300"
                                : "bg-green-100 text-green-700 hover:bg-green-200 border border-green-300"
                            }`}
                          >
                            {user.isActive ? "⏸️ Deactivate" : "▶️ Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.codUser)}
                            className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-xs font-medium border border-red-300 transition-colors"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
