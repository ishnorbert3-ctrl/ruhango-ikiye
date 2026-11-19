
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Truck,
    MapPin,
    Megaphone,
    Phone,
    LogOut,
    Leaf,
    Recycle,
    Users,
    Clock,
    CheckCircle,
    AlertCircle,
    UserCog
} from "lucide-react";

import API from "../api/axios.js";
import "./dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        residents: 0,
        collectors: 0,
        waste_reports: 0,
        collection_requests: 0
    });

    const [reports, setReports] = useState([]);
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!savedUser || !token) {
            navigate("/login");
            return;
        }

        let currentUser;

        try {
            currentUser = JSON.parse(savedUser);
            setUser(currentUser);
        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const loadDashboard = async () => {
            try {
                if (currentUser.role === "admin") {
                    const response = await API.get("/dashboard", config);
                    setStats(response.data.statistics || {});
                }

                if (currentUser.role === "resident") {
                    const [reportsResponse, requestsResponse] =
                        await Promise.all([
                            API.get("/reports/my-reports", config),
                            API.get("/collections/my-requests", config)
                        ]);

                    const reportData = reportsResponse.data;
                    const requestData = requestsResponse.data;

                    setReports(
                        Array.isArray(reportData)
                            ? reportData
                            : reportData.reports || []
                    );

                    setRequests(
                        Array.isArray(requestData)
                            ? requestData
                            : requestData.requests || []
                    );
                }
            } catch (error) {
                console.error("Dashboard error:", error);
                setMessage(
                    error.response?.data?.message ||
                    "Failed to load dashboard information."
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const getStatus = (status) => {
        const value = String(status || "pending").toLowerCase();

        if (["completed", "approved", "rejected", "pending", "in_progress"].includes(value)) {
            return value;
        }

        return "pending";
    };

    if (!user) {
        return <div className="dashboard-loading">Loading dashboard...</div>;
    }

    return (
        <div className="modern-dashboard">

            {/* SIDEBAR */}
            <aside className="modern-sidebar">

                <div className="sidebar-brand">
                    <div className="brand-icon">
                        <Leaf size={25} />
                    </div>

                    <div>
                        <h2>RUHANGO</h2>
                        <span>IKIYE</span>
                    </div>
                </div>

                <p className="sidebar-label">MAIN MENU</p>

                <nav className="sidebar-menu">
                    <a href="/dashboard" className="active">
                        <LayoutDashboard size={19} />
                        Dashboard
                    </a>

                    {/* ADMIN ONLY - USER MANAGEMENT */}
                    {user.role === "admin" && (
                        <a
                            href="/users"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/users");
                            }}
                        >
                            <UserCog size={19} />
                            User Management
                        </a>
                    )}

                    <a href="/services">
                        <Recycle size={19} />
                        Services
                    </a>

                    <a href="/locations">
                        <MapPin size={19} />
                        Locations
                    </a>

                    <a href="/campaigns">
                        <Megaphone size={19} />
                        Campaigns
                    </a>

                    <a href="/contact">
                        <Phone size={19} />
                        Contact
                    </a>
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-eco">
                        <Leaf size={22} />
                        <p>Keep Ruhango clean and green.</p>
                    </div>

                    <button onClick={handleLogout} className="logout-button">
                        <LogOut size={19} />
                        Logout
                    </button>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="modern-main">

                <header className="modern-topbar">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome back to your workspace</p>
                    </div>

                    <div className="topbar-user">
                        <div className="user-avatar">
                            {user.full_name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>{user.full_name}</strong>
                            <span>{user.role}</span>
                        </div>
                    </div>
                </header>

                <section className="modern-banner">
                    <div className="banner-content">
                        <span className="banner-tag">
                            <Leaf size={15} /> CLEANER RUHANGO, BETTER FUTURE
                        </span>

                        <h2>Hello, {user.full_name}! 👋</h2>

                        <p>
                            Together, let's build a cleaner, healthier
                            and greener Ruhango District.
                        </p>
                    </div>

                    <div className="banner-art">
                        <Recycle size={105} strokeWidth={1.2} />
                    </div>
                </section>

                {message && (
                    <div className="modern-message">
                        <AlertCircle size={18} />
                        {message}
                    </div>
                )}

                {loading ? (
                    <div className="dashboard-loading">
                        Loading your information...
                    </div>
                ) : (
                    <>
                        {/* ADMIN DASHBOARD */}
                        {user.role === "admin" && (
                            <>
                                <div className="section-heading">
                                    <div>
                                        <h2>System Overview</h2>
                                        <p>Monitor activities across the district.</p>
                                    </div>
                                </div>

                                <section className="modern-stats">
                                    <div className="modern-stat-card">
                                        <div className="stat-icon green">
                                            <Users size={24} />
                                        </div>
                                        <span>Total Residents</span>
                                        <h3>{stats.residents ?? 0}</h3>
                                        <small>Registered residents</small>
                                    </div>

                                    <div className="modern-stat-card">
                                        <div className="stat-icon blue">
                                            <Truck size={24} />
                                        </div>
                                        <span>Waste Collectors</span>
                                        <h3>{stats.collectors ?? 0}</h3>
                                        <small>Registered collectors</small>
                                    </div>

                                    <div className="modern-stat-card">
                                        <div className="stat-icon orange">
                                            <FileText size={24} />
                                        </div>
                                        <span>Waste Reports</span>
                                        <h3>{stats.waste_reports ?? 0}</h3>
                                        <small>Total reports</small>
                                    </div>

                                    <div className="modern-stat-card">
                                        <div className="stat-icon purple">
                                            <Recycle size={24} />
                                        </div>
                                        <span>Collection Requests</span>
                                        <h3>{stats.collection_requests ?? 0}</h3>
                                        <small>Total requests</small>
                                    </div>
                                </section>
                            </>
                        )}

                        {/* RESIDENT DASHBOARD */}
                        {user.role === "resident" && (
                            <>
                                <div className="section-heading">
                                    <div>
                                        <h2>Your Activities</h2>
                                        <p>Track your environmental contributions.</p>
                                    </div>
                                </div>

                                <section className="modern-stats">
                                    <div className="modern-stat-card">
                                        <div className="stat-icon green">
                                            <FileText size={24} />
                                        </div>
                                        <span>My Waste Reports</span>
                                        <h3>{reports.length}</h3>
                                        <small>Reports submitted by you</small>
                                    </div>

                                    <div className="modern-stat-card">
                                        <div className="stat-icon blue">
                                            <Truck size={24} />
                                        </div>
                                        <span>Collection Requests</span>
                                        <h3>{requests.length}</h3>
                                        <small>Your pickup requests</small>
                                    </div>

                                    <div className="modern-stat-card">
                                        <div className="stat-icon orange">
                                            <Clock size={24} />
                                        </div>
                                        <span>Pending Reports</span>
                                        <h3>
                                            {reports.filter(
                                                item => getStatus(item.status) === "pending"
                                            ).length}
                                        </h3>
                                        <small>Waiting for review</small>
                                    </div>

                                    <div className="modern-stat-card">
                                        <div className="stat-icon purple">
                                            <CheckCircle size={24} />
                                        </div>
                                        <span>Completed Requests</span>
                                        <h3>
                                            {requests.filter(
                                                item => getStatus(item.status) === "completed"
                                            ).length}
                                        </h3>
                                        <small>Successfully completed</small>
                                    </div>
                                </section>

                                <section className="modern-panel">
                                    <div className="panel-heading">
                                        <div>
                                            <h2>My Waste Reports</h2>
                                            <p>Reports you have submitted.</p>
                                        </div>
                                        <FileText size={22} />
                                    </div>

                                    {reports.length === 0 ? (
                                        <div className="empty-state">
                                            <FileText size={35} />
                                            <h3>No reports yet</h3>
                                            <p>Your submitted waste reports will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="activity-list">
                                            {reports.map((report, index) => (
                                                <div className="activity-item" key={report.id || index}>
                                                    <div className="activity-icon">
                                                        <FileText size={20} />
                                                    </div>

                                                    <div className="activity-details">
                                                        <h3>{report.waste_type || "Waste Report"}</h3>
                                                        <p>{report.description || "No description"}</p>
                                                        <small>
                                                            <MapPin size={13} />
                                                            {report.location || report.address || "Location not provided"}
                                                        </small>
                                                    </div>

                                                    <span className={`modern-status ${getStatus(report.status)}`}>
                                                        {report.status || "Pending"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                <section className="modern-panel">
                                    <div className="panel-heading">
                                        <div>
                                            <h2>My Collection Requests</h2>
                                            <p>Track your waste collection services.</p>
                                        </div>
                                        <Truck size={22} />
                                    </div>

                                    {requests.length === 0 ? (
                                        <div className="empty-state">
                                            <Truck size={35} />
                                            <h3>No collection requests</h3>
                                            <p>Your pickup requests will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="activity-list">
                                            {requests.map((request, index) => (
                                                <div className="activity-item" key={request.id || index}>
                                                    <div className="activity-icon">
                                                        <Truck size={20} />
                                                    </div>

                                                    <div className="activity-details">
                                                        <h3>{request.waste_type || "Collection Request"}</h3>
                                                        <p>Quantity: {request.quantity || "Not specified"}</p>
                                                        <small>
                                                            <MapPin size={13} />
                                                            {request.pickup_location || "Location not provided"}
                                                        </small>
                                                        <small>
                                                            Preferred date: {request.preferred_date || "Not specified"}
                                                        </small>
                                                    </div>

                                                    <span className={`modern-status ${getStatus(request.status)}`}>
                                                        {request.status || "Pending"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            </>
                        )}

                        {/* COLLECTOR DASHBOARD */}
                        {user.role === "collector" && (
                            <section className="modern-panel">
                                <div className="panel-heading">
                                    <div>
                                        <h2>Collector Workspace</h2>
                                        <p>Welcome to your waste collection workspace.</p>
                                    </div>
                                    <Truck size={25} />
                                </div>

                                <div className="empty-state">
                                    <Recycle size={40} />
                                    <h3>Keep Ruhango clean!</h3>
                                    <p>Thank you for supporting waste management in Ruhango.</p>
                                </div>
                            </section>
                        )}
                    </>
                )}

                <footer className="modern-footer">
                    <p>© 2026 RUHANGO IKIYE. Building a cleaner Ruhango.</p>
                </footer>

            </main>
        </div>
    );
}

export default Dashboard;
