
import React, { useEffect, useState } from "react";
import {
    Search,
    RefreshCw,
    Trash2,
    Users as UsersIcon,
    ShieldCheck,
    User,
    Truck
} from "lucide-react";

import API from "../api/axios";
import "./Users.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const token = localStorage.getItem("token");

    // GET ALL USERS
    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsers(response.data.users || []);

        } catch (err) {
            console.error("Fetch users error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load users."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // UPDATE USER ROLE
    const updateRole = async (id, role) => {
        try {
            setMessage("");
            setError("");

            await API.put(
                `/users/${id}/role`,
                { role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("User role updated successfully!");
            fetchUsers();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update user role."
            );
        }
    };

    // DELETE USER
    const deleteUser = async (id, name) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmed) return;

        try {
            setMessage("");
            setError("");

            await API.delete(`/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage("User deleted successfully!");
            fetchUsers();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete user."
            );
        }
    };

    // SEARCH USERS
    const filteredUsers = users.filter((user) => {
        const value = search.toLowerCase();

        return (
            user.full_name?.toLowerCase().includes(value) ||
            user.email?.toLowerCase().includes(value) ||
            user.role?.toLowerCase().includes(value)
        );
    });

    const getRoleIcon = (role) => {
        if (role === "admin") return <ShieldCheck size={16} />;
        if (role === "collector") return <Truck size={16} />;
        return <User size={16} />;
    };

    return (
        <div className="users-page">

            <div className="users-header">
                <div>
                    <h1>User Management</h1>
                    <p>Manage RUHANGO IKIYE system users.</p>
                </div>

                <button
                    className="users-refresh"
                    onClick={fetchUsers}
                    disabled={loading}
                >
                    <RefreshCw size={17} />
                    Refresh
                </button>
            </div>

            <div className="users-summary">
                <div className="users-summary-icon">
                    <UsersIcon size={28} />
                </div>

                <div>
                    <h2>{users.length}</h2>
                    <p>Total Registered Users</p>
                </div>
            </div>

            {message && (
                <div className="users-success">{message}</div>
            )}

            {error && (
                <div className="users-error">{error}</div>
            )}

            <div className="users-container">

                <div className="users-toolbar">
                    <div>
                        <h2>All Users</h2>
                        <p>View and manage registered accounts.</p>
                    </div>

                    <div className="users-search">
                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search name, email or role..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="users-loading">
                        Loading users...
                    </div>
                ) : (
                    <div className="users-table-wrapper">
                        <table className="users-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Registered Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td>#{user.id}</td>

                                        <td className="users-name">
                                            {user.full_name}
                                        </td>

                                        <td>{user.email}</td>

                                        <td>{user.phone || "N/A"}</td>

                                        <td>
                                            <div className={`users-role ${user.role}`}>
                                                {getRoleIcon(user.role)}
                                                {user.role}
                                            </div>
                                        </td>

                                        <td>
                                            {user.created_at
                                                ? new Date(user.created_at).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td>
                                            <div className="users-actions">

                                                <select
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        updateRole(
                                                            user.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={
                                                        Number(user.id) ===
                                                        Number(JSON.parse(
                                                            localStorage.getItem("user") || "{}"
                                                        ).id)
                                                    }
                                                >
                                                    <option value="resident">
                                                        Resident
                                                    </option>

                                                    <option value="collector">
                                                        Collector
                                                    </option>

                                                    <option value="admin">
                                                        Admin
                                                    </option>
                                                </select>

                                                <button
                                                    className="users-delete"
                                                    onClick={() =>
                                                        deleteUser(
                                                            user.id,
                                                            user.full_name
                                                        )
                                                    }
                                                    disabled={
                                                        Number(user.id) ===
                                                        Number(JSON.parse(
                                                            localStorage.getItem("user") || "{}"
                                                        ).id)
                                                    }
                                                    title="Delete user"
                                                >
                                                    <Trash2 size={17} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="users-empty">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
