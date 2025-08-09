import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Link,
  BarChart3,
  Bell,
  Play,
  User,
  Star,
  Menu,
  X,
  Plus,
  RefreshCw,
  Wifi,
  WifiOff,
  Zap,
  Brain,
  Target,
  Edit3,
  Save,
  Trash2,
  AlertCircle,
  Eye,
  EyeOff,
  Clock,
  DollarSign,
  Settings,
  Upload,
  Video,
  Calendar,
  MessageCircle,
  Users,
  Mail,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download,
} from "lucide-react";

// Authentication Hook
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = {
        id: Date.now(),
        email,
        name: email.split("@")[0],
        isPremium: false,
        isAdmin: email === "admin@mindovermarket.com",
        createdAt: new Date().toISOString(),
        subscription: "free",
        trades: 0,
      };

      sessionStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const register = async (userData) => {
    try {
      const newUser = {
        id: Date.now(),
        ...userData,
        isPremium: false,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        subscription: "free",
        trades: 0,
      };

      sessionStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout,
  };
};

// Authentication Page
const AuthPage = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      const result = await onLogin(formData.email, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError("Le password non coincidono");
        setLoading(false);
        return;
      }

      const result = await onRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setError(result.error);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Mind Above Charts</h1>
          <p className="text-emerald-100 text-sm mt-1">
            {isLogin ? "Bentornato, trader!" : "Inizia il tuo percorso"}
          </p>
        </div>

        <div className="p-8">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                isLogin
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Accedi
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                !isLogin
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Registrati
            </button>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Il tuo nome"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="email@esempio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conferma Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Caricamento..." : isLogin ? "Accedi" : "Registrati"}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">
              Account Demo:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    email: "demo@user.com",
                    password: "demo123",
                  })
                }
                className="bg-gray-100 text-gray-600 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                👤 Demo User
              </button>
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    email: "admin@mindovermarket.com",
                    password: "admin123",
                  })
                }
                className="bg-gray-100 text-gray-600 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                👨‍💼 Demo Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Admin Page with ALL features
const AdminPage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Static stats data
  const stats = {
    totalUsers: 247,
    premiumUsers: 89,
    freeUsers: 158,
    monthlyGrowth: 23,
    totalBookings: 34,
    completedSessions: 28,
    pendingSessions: 6,
    avgSessionRating: 4.8,
    revenue: 2840,
    engagement: 76,
    churnRate: 8,
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Marco Rossi",
      email: "marco@email.com",
      subscription: "Premium",
      trades: 45,
      joined: "2024-01-15",
      lastActive: "2025-08-08",
      engagement: "High",
      totalPnL: 2350,
    },
    {
      id: 2,
      name: "Laura Bianchi",
      email: "laura@email.com",
      subscription: "Free",
      trades: 12,
      joined: "2024-02-20",
      lastActive: "2025-08-07",
      engagement: "Medium",
      totalPnL: -150,
    },
    {
      id: 3,
      name: "Giuseppe Verdi",
      email: "giuseppe@email.com",
      subscription: "Premium",
      trades: 78,
      joined: "2024-01-03",
      lastActive: "2025-08-06",
      engagement: "High",
      totalPnL: 5670,
    },
    {
      id: 4,
      name: "Sofia Ferrari",
      email: "sofia@email.com",
      subscription: "Free",
      trades: 8,
      joined: "2024-03-10",
      lastActive: "2025-08-05",
      engagement: "Low",
      totalPnL: -80,
    },
    {
      id: 5,
      name: "Luca Moretti",
      email: "luca@email.com",
      subscription: "Premium",
      trades: 92,
      joined: "2024-01-20",
      lastActive: "2025-08-08",
      engagement: "High",
      totalPnL: 8920,
    },
  ]);

  const [contents, setContents] = useState([
    {
      id: 1,
      title: "Analisi EUR/USD Weekly",
      type: "analysis",
      status: "published",
      date: "2025-08-08",
      views: 245,
      likes: 32,
      target: "Premium",
    },
    {
      id: 2,
      title: "Setup Gold - Opportunità Long",
      type: "setup",
      status: "draft",
      date: "2025-08-08",
      views: 0,
      likes: 0,
      target: "All",
    },
    {
      id: 3,
      title: "Risk Management Masterclass",
      type: "course",
      status: "published",
      date: "2025-08-07",
      views: 189,
      likes: 28,
      target: "Premium",
    },
    {
      id: 4,
      title: "Market Update Giornaliero",
      type: "update",
      status: "scheduled",
      date: "2025-08-09",
      views: 0,
      likes: 0,
      target: "All",
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Psicologia del Trading",
      description: "Controlla le emozioni e migliora le decisioni",
      videos: [
        {
          id: 1,
          title: "Introduzione alla Psicologia",
          duration: "8:30",
          uploaded: true,
          views: 156,
        },
        {
          id: 2,
          title: "Gestione delle Emozioni",
          duration: "12:45",
          uploaded: true,
          views: 134,
        },
        {
          id: 3,
          title: "Disciplina e Costanza",
          duration: "15:20",
          uploaded: false,
          views: 0,
        },
      ],
      totalDuration: "45 min",
      free: true,
      enrollments: 89,
      rating: 4.8,
    },
    {
      id: 2,
      title: "Pattern Istituzionali",
      description: "Riconosci i movimenti dei grandi player",
      videos: [
        {
          id: 1,
          title: "Smart Money Concept",
          duration: "18:30",
          uploaded: true,
          views: 67,
        },
        {
          id: 2,
          title: "Order Block Analysis",
          duration: "22:15",
          uploaded: true,
          views: 45,
        },
      ],
      totalDuration: "32 min",
      free: false,
      enrollments: 34,
      rating: 4.9,
    },
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      userId: 1,
      userName: "Marco Rossi",
      date: "2025-08-12",
      time: "14:00",
      type: "single",
      status: "confirmed",
      topic: "Risk Management Review",
      notes: "Wants to improve position sizing",
    },
    {
      id: 2,
      userId: 3,
      userName: "Giuseppe Verdi",
      date: "2025-08-14",
      time: "16:00",
      type: "package",
      status: "pending",
      topic: "Advanced Strategies",
      notes: "Session 2 of 5",
    },
    {
      id: 3,
      userId: 2,
      userName: "Laura Bianchi",
      date: "2025-08-15",
      time: "10:00",
      type: "single",
      status: "confirmed",
      topic: "Journal Analysis",
      notes: "First session",
    },
    {
      id: 4,
      userId: 5,
      userName: "Luca Moretti",
      date: "2025-08-16",
      time: "15:30",
      type: "package",
      status: "completed",
      topic: "Psychology Session",
      notes: "Session 3 of 5 - Excellent progress",
    },
  ]);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      pair: "EUR/USD",
      level: "1.0850",
      type: "Support",
      active: true,
      createdBy: "Admin",
      subscribers: 45,
    },
    {
      id: 2,
      pair: "GBP/USD",
      level: "1.2800",
      type: "Resistance",
      active: true,
      createdBy: "Admin",
      subscribers: 38,
    },
    {
      id: 3,
      pair: "USD/JPY",
      level: "149.50",
      type: "Breakout",
      active: false,
      createdBy: "Admin",
      subscribers: 52,
    },
  ]);

  const [userTrades, setUserTrades] = useState({
    1: [
      {
        id: 1,
        date: "2025-08-08",
        asset: "EUR/USD",
        direction: "Long",
        entry: 1.085,
        exit: 1.092,
        pnl: 350,
        mindset: "Confident setup",
        lessons: "Perfect risk management",
      },
      {
        id: 2,
        date: "2025-08-07",
        asset: "GBP/USD",
        direction: "Short",
        entry: 1.275,
        exit: 1.268,
        pnl: 280,
        mindset: "Patient entry",
        lessons: "Good exit timing",
      },
    ],
  });

  const [supportTickets, setSupportTickets] = useState([
    {
      id: 1,
      userId: 2,
      userName: "Laura Bianchi",
      subject: "MT5 Integration Issue",
      status: "open",
      priority: "high",
      created: "2025-08-08",
    },
    {
      id: 2,
      userId: 4,
      userName: "Sofia Ferrari",
      subject: "Premium Upgrade Question",
      status: "pending",
      priority: "medium",
      created: "2025-08-07",
    },
    {
      id: 3,
      userId: 1,
      userName: "Marco Rossi",
      subject: "Video Course Access",
      status: "resolved",
      priority: "low",
      created: "2025-08-06",
    },
  ]);

  const [newVideo, setNewVideo] = useState({
    title: "",
    duration: "",
    file: null,
  });
  const [newAlert, setNewAlert] = useState({
    pair: "",
    level: "",
    type: "Support",
  });

  const [newContent, setNewContent] = useState({
    title: "",
    type: "analysis",
    content: "",
    target: "All",
    scheduleDate: new Date().toISOString().split("T")[0],
    scheduleTime: "09:00",
  });

  const [showContentModal, setShowContentModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showUserTradesModal, setShowUserTradesModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const publishContent = (contentId) => {
    setContents((prev) =>
      prev.map((content) =>
        content.id === contentId
          ? {
              ...content,
              status: "published",
              views: Math.floor(Math.random() * 300) + 50,
            }
          : content
      )
    );
  };

  const createContent = () => {
    if (!newContent.title || !newContent.content) return;

    const content = {
      id: Date.now(),
      ...newContent,
      status: "draft",
      date: new Date().toISOString().split("T")[0],
      views: 0,
      likes: 0,
    };

    setContents([content, ...contents]);
    setNewContent({
      title: "",
      type: "analysis",
      content: "",
      target: "All",
      scheduleDate: new Date().toISOString().split("T")[0],
      scheduleTime: "09:00",
    });
    setShowContentModal(false);
  };

  const sendAnalysisToUsers = (userGroup) => {
    alert(
      `Analisi inviata a ${
        userGroup === "all" ? "tutti gli utenti" : `utenti ${userGroup}`
      }`
    );
    setShowAnalysisModal(false);
  };

  const addVideoToCourse = (courseId) => {
    if (!newVideo.title || !newVideo.duration) return;

    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              videos: [
                ...course.videos,
                {
                  id: Date.now(),
                  title: newVideo.title,
                  duration: newVideo.duration,
                  uploaded: true,
                  views: 0,
                },
              ],
            }
          : course
      )
    );

    setNewVideo({ title: "", duration: "", file: null });
    setShowVideoModal(false);
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const createAlert = () => {
    if (!newAlert.pair || !newAlert.level) return;

    const alert = {
      id: Date.now(),
      ...newAlert,
      active: true,
      createdBy: "Admin",
      subscribers: 0,
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({ pair: "", level: "", type: "Support" });
    setShowAlertModal(false);
  };

  const sendAlertToUsers = (alertId) => {
    const alert = alerts.find((a) => a.id === alertId);
    if (alert) {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? {
                ...a,
                subscribers:
                  a.subscribers + Math.floor(Math.random() * 20) + 10,
              }
            : a
        )
      );
      alert(`Alert ${alert.pair} @ ${alert.level} inviato a tutti gli utenti!`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">Mind Above Charts</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Ciao, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="p-6">
            {[
              { id: "overview", label: "Panoramica", icon: "📊" },
              { id: "users", label: "Utenti", icon: "👥" },
              {
                id: "user-trades",
                label: "Trading Journal Utenti",
                icon: "📈",
              },
              { id: "content", label: "Contenuti", icon: "📝" },
              { id: "courses", label: "Gestione Corsi", icon: "🎓" },
              { id: "bookings", label: "Prenotazioni 1:1", icon: "📅" },
              { id: "alerts", label: "Alert Management", icon: "🚨" },
              { id: "analytics", label: "Analytics", icon: "📈" },
              { id: "subscriptions", label: "Abbonamenti", icon: "💳" },
              { id: "support", label: "Supporto", icon: "💬" },
              { id: "integrations", label: "Integrazioni", icon: "🔗" },
              { id: "settings", label: "Impostazioni", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                  activeTab === tab.id
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Panoramica
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Utenti Totali</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {stats.totalUsers}
                      </p>
                      <p className="text-xs text-emerald-600 mt-1">
                        +{stats.monthlyGrowth}% questo mese
                      </p>
                    </div>
                    <span className="text-2xl">👥</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Sessioni 1:1</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {stats.totalBookings}
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        {stats.pendingSessions} in programma
                      </p>
                    </div>
                    <span className="text-2xl">📅</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Ricavi Mensili</p>
                      <p className="text-2xl font-bold text-green-600">
                        €{stats.revenue}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Rating: {stats.avgSessionRating}⭐
                      </p>
                    </div>
                    <span className="text-2xl">💰</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Engagement</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.engagement}%
                      </p>
                      <p className="text-xs text-red-500 mt-1">
                        {stats.churnRate}% churn rate
                      </p>
                    </div>
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Azioni Rapide</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setShowContentModal(true)}
                    className="bg-emerald-600 text-white p-4 rounded-lg hover:bg-emerald-700 transition-colors text-center"
                  >
                    <span className="text-2xl mb-2 block">📝</span>
                    <span className="text-sm font-medium">Nuova Analisi</span>
                  </button>
                  <button
                    onClick={() => setShowCourseModal(true)}
                    className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    <span className="text-2xl mb-2 block">🎓</span>
                    <span className="text-sm font-medium">Nuovo Corso</span>
                  </button>
                  <button
                    onClick={() => setShowAlertModal(true)}
                    className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
                  >
                    <span className="text-2xl mb-2 block">🚨</span>
                    <span className="text-sm font-medium">Nuovo Alert</span>
                  </button>
                  <button
                    onClick={() => setShowAnalysisModal(true)}
                    className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors text-center"
                  >
                    <span className="text-2xl mb-2 block">📊</span>
                    <span className="text-sm font-medium">Invia Report</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Gestione Utenti
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Monitora e gestisci la tua community di trader
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    📧 Email Broadcast
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    + Aggiungi Utente
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Filtra per:
                  </span>
                  <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    Tutti ({stats.totalUsers})
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Premium ({stats.premiumUsers})
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Free ({stats.freeUsers})
                  </button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors">
                    High Engagement
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Utente
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Abbonamento
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Engagement
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Ultimo Accesso
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Trade
                      </th>
                      <th className="text-left p-4 font-medium text-gray-700">
                        Azioni
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.subscription === "Premium"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.subscription}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                user.engagement === "High"
                                  ? "bg-emerald-500"
                                  : user.engagement === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-sm text-gray-700">
                              {user.engagement}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 text-sm">
                          {user.lastActive}
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-800">
                            {user.trades}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            operazioni
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              📊
                            </button>
                            <button className="text-emerald-600 hover:text-emerald-700 text-sm">
                              ✉️
                            </button>
                            <button className="text-gray-600 hover:text-gray-700 text-sm">
                              ⚙️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User Trades Management Tab */}
          {activeTab === "user-trades" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Trading Journal Utenti
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Monitora e analizza i trade dei tuoi studenti
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    📊 Report Globale
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    📈 Analisi Performance
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">
                    Utenti con Performance Recenti
                  </h3>
                </div>

                <div className="divide-y">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {user.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-6 text-center">
                          <div>
                            <p className="text-sm text-gray-500">
                              Trade Totali
                            </p>
                            <p className="font-bold text-gray-800">
                              {user.trades}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">P&L Totale</p>
                            <p
                              className={`font-bold ${
                                user.totalPnL > 0
                                  ? "text-emerald-600"
                                  : "text-red-600"
                              }`}
                            >
                              {user.totalPnL > 0 ? "+" : ""}
                              {user.totalPnL}€
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Engagement</p>
                            <div className="flex items-center justify-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  user.engagement === "High"
                                    ? "bg-emerald-500"
                                    : user.engagement === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span className="text-sm font-medium">
                                {user.engagement}
                              </span>
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserTradesModal(true);
                              }}
                              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                            >
                              📈 Vedi Journal
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Gestione Contenuti
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Crea e gestisci analisi, setup e corsi
                  </p>
                </div>
                <button
                  onClick={() => setShowContentModal(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  + Nuovo Contenuto
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {contents.filter((c) => c.type === "analysis").length}
                  </div>
                  <div className="text-sm text-gray-600">Analisi</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {contents.filter((c) => c.type === "setup").length}
                  </div>
                  <div className="text-sm text-gray-600">Setup</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {contents.filter((c) => c.type === "course").length}
                  </div>
                  <div className="text-sm text-gray-600">Corsi</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {contents.filter((c) => c.status === "published").length}
                  </div>
                  <div className="text-sm text-gray-600">Pubblicati</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">I Tuoi Contenuti</h3>
                </div>
                <div className="divide-y">
                  {contents.map((content) => (
                    <div
                      key={content.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {content.title}
                            </h4>
                            <span
                              className={`px-3 py-1 text-xs rounded-full font-medium ${
                                content.type === "analysis"
                                  ? "bg-blue-100 text-blue-800"
                                  : content.type === "setup"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : content.type === "course"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-orange-100 text-orange-800"
                              }`}
                            >
                              {content.type === "analysis"
                                ? "📊 Analisi"
                                : content.type === "setup"
                                ? "🎯 Setup"
                                : content.type === "course"
                                ? "🎓 Corso"
                                : "📈 Update"}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                content.status === "published"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : content.status === "draft"
                                  ? "bg-gray-100 text-gray-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {content.status === "published"
                                ? "✅ Pubblicato"
                                : content.status === "draft"
                                ? "📝 Bozza"
                                : "⏰ Programmato"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <span>📅 {content.date}</span>
                            <span>👁 {content.views} visualizzazioni</span>
                            <span>❤️ {content.likes} like</span>
                            <span>🎯 Target: {content.target}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {content.status === "draft" && (
                            <button
                              onClick={() => publishContent(content.id)}
                              className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors"
                            >
                              📢 Pubblica
                            </button>
                          )}
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                            ✏️ Modifica
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Courses Management Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Gestione Mini-Corsi
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Crea e gestisci video corsi per i tuoi studenti
                  </p>
                </div>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  + Nuovo Corso
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl shadow-sm border"
                  >
                    <div className="p-6 border-b">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {course.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {course.free && (
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 text-xs rounded-full">
                              Gratis
                            </span>
                          )}
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                            {course.rating}⭐
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-500">Video</p>
                          <p className="font-bold text-blue-600">
                            {course.videos.length}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Iscritti</p>
                          <p className="font-bold text-emerald-600">
                            {course.enrollments}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Durata</p>
                          <p className="font-bold text-purple-600">
                            {course.totalDuration}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-700">
                          Video del Corso
                        </h4>
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowVideoModal(true);
                          }}
                          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                        >
                          + Aggiungi Video
                        </button>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {course.videos.map((video) => (
                          <div
                            key={video.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  video.uploaded
                                    ? "bg-emerald-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">
                                  {video.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {video.duration} • {video.views}{" "}
                                  visualizzazioni
                                </p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-700">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Management Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Prenotazioni Coaching 1:1
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Gestisci sessioni personali e pacchetti
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    📅 Calendario
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    + Nuova Prenotazione
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {stats.totalBookings}
                  </div>
                  <div className="text-sm text-gray-600">Totale Sessioni</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {stats.completedSessions}
                  </div>
                  <div className="text-sm text-gray-600">Completate</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.pendingSessions}
                  </div>
                  <div className="text-sm text-gray-600">In Programma</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.avgSessionRating}
                  </div>
                  <div className="text-sm text-gray-600">Rating Medio</div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Prossime Sessioni</h3>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        Tutte
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200">
                        In Attesa
                      </button>
                      <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200">
                        Confermate
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {booking.userName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {booking.topic}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.date} alle {booking.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.type === "single"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {booking.type === "single"
                                ? "Sessione Singola"
                                : "Pacchetto"}
                            </span>
                          </div>

                          <div className="text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "completed"
                                  ? "bg-gray-100 text-gray-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status === "confirmed"
                                ? "✅ Confermata"
                                : booking.status === "pending"
                                ? "⏳ In Attesa"
                                : booking.status === "completed"
                                ? "✅ Completata"
                                : "❌ Cancellata"}
                            </span>
                          </div>

                          <div className="flex space-x-2">
                            {booking.status === "pending" && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "confirmed")
                                }
                                className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors"
                              >
                                ✅ Conferma
                              </button>
                            )}
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() =>
                                  updateBookingStatus(booking.id, "completed")
                                }
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                🏁 Completa
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setShowBookingModal(true);
                              }}
                              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                            >
                              📝 Dettagli
                            </button>
                          </div>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Note:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Alerts Management Tab */}
          {activeTab === "alerts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Gestione Alert di Mercato
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Crea e invia alert personalizzati agli utenti
                  </p>
                </div>
                <button
                  onClick={() => setShowAlertModal(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  🚨 Nuovo Alert
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Alert Attivi</h3>
                </div>

                <div className="divide-y">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              alert.active ? "bg-emerald-500" : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <h4 className="font-bold text-gray-800">
                              {alert.pair}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {alert.type} @ {alert.level}
                            </p>
                            <p className="text-xs text-gray-500">
                              👥 {alert.subscribers} iscritti
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              alert.active
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {alert.active ? "🟢 Attivo" : "🔴 Inattivo"}
                          </span>

                          <button
                            onClick={() => sendAlertToUsers(alert.id)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                          >
                            📢 Invia Alert
                          </button>

                          <button
                            onClick={() =>
                              setAlerts((prev) =>
                                prev.map((a) =>
                                  a.id === alert.id
                                    ? { ...a, active: !a.active }
                                    : a
                                )
                              )
                            }
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                              alert.active
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                          >
                            {alert.active ? "Disattiva" : "Attiva"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Analytics Avanzate
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Analisi dettagliate delle performance
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    📊 Export Report
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    📈 Dashboard Real-time
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Conversion Rate
                    </h3>
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    12.3%
                  </div>
                  <div className="text-sm text-gray-600">Free → Premium</div>
                  <div className="text-xs text-emerald-600 mt-1">
                    +2.1% vs mese scorso
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Retention Rate
                    </h3>
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    89.2%
                  </div>
                  <div className="text-sm text-gray-600">
                    Utenti attivi a 30 giorni
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    +5.3% vs mese scorso
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Coaching ROI
                    </h3>
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    340%
                  </div>
                  <div className="text-sm text-gray-600">
                    Return on Investment
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    €2,130 revenue/sessione
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Engagement Score
                    </h3>
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    8.7/10
                  </div>
                  <div className="text-sm text-gray-600">Engagement medio</div>
                  <div className="text-xs text-orange-600 mt-1">
                    +0.4 vs mese scorso
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Performance Contenuti
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        type: "Analisi EUR/USD",
                        views: 1245,
                        engagement: "94%",
                        color: "blue",
                      },
                      {
                        type: "Setup Gold Weekly",
                        views: 890,
                        engagement: "87%",
                        color: "emerald",
                      },
                      {
                        type: "Corso Psicologia",
                        views: 756,
                        engagement: "91%",
                        color: "purple",
                      },
                      {
                        type: "Market Update",
                        views: 643,
                        engagement: "78%",
                        color: "orange",
                      },
                    ].map((content, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {content.type}
                          </p>
                          <p className="text-sm text-gray-600">
                            {content.views} visualizzazioni
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-${content.color}-600`}>
                            {content.engagement}
                          </p>
                          <p className="text-xs text-gray-500">engagement</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Breakdown Ricavi
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Abbonamenti Premium</span>
                      <span className="font-bold text-emerald-600">
                        €{Math.round(stats.revenue * 0.75)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Coaching 1:1</span>
                      <span className="font-bold text-purple-600">
                        €{Math.round(stats.revenue * 0.25)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Corsi Avanzati</span>
                      <span className="font-bold text-blue-600">
                        €{Math.round(stats.revenue * 0.15)}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex items-center justify-between">
                      <span className="font-semibold text-gray-800">
                        Totale Mensile
                      </span>
                      <span className="font-bold text-green-600 text-lg">
                        €{stats.revenue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions Tab */}
          {activeTab === "subscriptions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Gestione Abbonamenti
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Monitora piani, pagamenti e conversioni
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    🎯 Campagna Conversione
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    💳 Gestisci Piani
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Piano Free
                    </h3>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      Gratuito
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-600 mb-2">
                      {stats.freeUsers}
                    </div>
                    <p className="text-gray-600">utenti attivi</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      ✅ Trading Journal base
                    </p>
                    <p className="text-sm text-gray-600">✅ 1 corso gratuito</p>
                    <p className="text-sm text-gray-600">
                      ✅ Supporto community
                    </p>
                    <p className="text-sm text-gray-600">✅ Alert base</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-blue-600">
                          {Math.round(stats.freeUsers * 0.23)}
                        </div>
                        <div className="text-gray-500">Conversioni/mese</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-600">12%</div>
                        <div className="text-gray-500">Tasso conversione</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-200 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Più Popolare
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-emerald-700">
                      Piano Premium
                    </h3>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                      €9.99/mese
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {stats.premiumUsers}
                    </div>
                    <p className="text-gray-600">utenti premium</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      ✅ Tutto del piano Free
                    </p>
                    <p className="text-sm text-gray-600">
                      ✅ Analisi settimanali esclusive
                    </p>
                    <p className="text-sm text-gray-600">
                      ✅ Setup trading premium
                    </p>
                    <p className="text-sm text-gray-600">
                      ✅ Alert avanzati real-time
                    </p>
                    <p className="text-sm text-gray-600">
                      ✅ Supporto prioritario
                    </p>
                    <p className="text-sm text-gray-600">
                      ✅ Accesso corsi avanzati
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-emerald-600">
                          €{Math.round(stats.revenue * 0.75)}
                        </div>
                        <div className="text-gray-500">Ricavi/mese</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">
                          {(
                            (stats.premiumUsers / stats.totalUsers) *
                            100
                          ).toFixed(1)}
                          %
                        </div>
                        <div className="text-gray-500">Penetrazione</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-purple-700">
                      Coaching 1:1
                    </h3>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      €80-300
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {stats.totalBookings}
                    </div>
                    <p className="text-gray-600">sessioni totali</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">
                      🎯 Sessioni personalizzate
                    </p>
                    <p className="text-sm text-gray-600">
                      📊 Analisi portfolio dettagliata
                    </p>
                    <p className="text-sm text-gray-600">
                      🧠 Mindset coaching individuale
                    </p>
                    <p className="text-sm text-gray-600">
                      📱 Supporto WhatsApp
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-center text-sm">
                      <div>
                        <div className="font-bold text-purple-600">
                          €{Math.round(stats.revenue * 0.25)}
                        </div>
                        <div className="text-gray-500">Ricavi coaching</div>
                      </div>
                      <div>
                        <div className="font-bold text-orange-600">
                          {stats.avgSessionRating}⭐
                        </div>
                        <div className="text-gray-500">Rating medio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Flusso Conversioni e Lifecycle
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">342</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Visitatori/mese
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      +15% crescita
                    </div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">
                      {stats.totalUsers}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Registrazioni
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">
                      72% conv. rate
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(stats.totalUsers * 0.45)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Trial Premium
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      45% activation
                    </div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {stats.premiumUsers}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Premium Attivi
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">
                      68% trial→paid
                    </div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round(stats.premiumUsers * 0.23)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Coaching 1:1
                    </div>
                    <div className="text-xs text-orange-600 mt-1">
                      23% upsell
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === "support" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Centro Supporto
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Gestisci richieste di assistenza e feedback
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    📧 Email Broadcast
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    💬 Chat Live
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Ticket di Supporto</h3>
                </div>

                <div className="divide-y">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">
                              {ticket.subject}
                            </h4>
                            <p className="text-sm text-gray-600">
                              da {ticket.userName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {ticket.created}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              ticket.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ticket.priority === "high"
                              ? "🔴 Alto"
                              : ticket.priority === "medium"
                              ? "🟡 Medio"
                              : "🟢 Basso"}
                          </span>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              ticket.status === "open"
                                ? "bg-blue-100 text-blue-800"
                                : ticket.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {ticket.status === "open"
                              ? "🔓 Aperto"
                              : ticket.status === "pending"
                              ? "⏳ In Corso"
                              : "✅ Risolto"}
                          </span>

                          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                            💬 Rispondi
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Integrazioni Sistema
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Gestisci API, webhook e connessioni esterne
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    🔧 Test Connessioni
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    📊 Logs Sistema
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Platform Integrations
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "MetaTrader Bridge",
                        status: "active",
                        users: 156,
                        uptime: "99.8%",
                      },
                      {
                        name: "TradingView Webhooks",
                        status: "active",
                        users: 89,
                        uptime: "98.5%",
                      },
                      {
                        name: "Binance API",
                        status: "maintenance",
                        users: 67,
                        uptime: "97.2%",
                      },
                      {
                        name: "Email Service (SendGrid)",
                        status: "active",
                        users: 247,
                        uptime: "99.9%",
                      },
                    ].map((integration, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              integration.status === "active"
                                ? "bg-emerald-500"
                                : integration.status === "maintenance"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {integration.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {integration.users} utenti connessi
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">
                            {integration.uptime}
                          </p>
                          <p className="text-xs text-gray-500">Uptime</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    API Configuration
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-emerald-800">
                          Sync Engine
                        </span>
                        <span className="text-emerald-600 font-bold">
                          ONLINE
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          Sync ogni: <strong>30 sec</strong>
                        </div>
                        <div>
                          Rate limit: <strong>1000/min</strong>
                        </div>
                        <div>
                          Queue size: <strong>12</strong>
                        </div>
                        <div>
                          Errors: <strong>0</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-blue-800">
                          Notification System
                        </span>
                        <span className="text-blue-600 font-bold">ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          Email sent: <strong>1,247</strong>
                        </div>
                        <div>
                          Push notifications: <strong>3,456</strong>
                        </div>
                        <div>
                          Success rate: <strong>99.2%</strong>
                        </div>
                        <div>
                          Bounce rate: <strong>1.8%</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Webhook & API Logs
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {[
                    {
                      time: "14:32:15",
                      service: "MT5 Bridge",
                      message: "Trade sync successful for user #156",
                      type: "success",
                    },
                    {
                      time: "14:31:45",
                      service: "Email Service",
                      message: "Weekly analysis sent to 89 premium users",
                      type: "info",
                    },
                    {
                      time: "14:30:20",
                      service: "TradingView",
                      message: "Webhook timeout - retrying connection",
                      type: "warning",
                    },
                    {
                      time: "14:29:10",
                      service: "Binance API",
                      message: "Rate limit reached - backing off for 60s",
                      type: "warning",
                    },
                    {
                      time: "14:28:05",
                      service: "Analytics",
                      message: "Daily report generated successfully",
                      type: "success",
                    },
                    {
                      time: "14:27:30",
                      service: "User Auth",
                      message: "Failed login attempt blocked",
                      type: "error",
                    },
                  ].map((log, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.type === "success"
                            ? "bg-emerald-500"
                            : log.type === "warning"
                            ? "bg-yellow-500"
                            : log.type === "error"
                            ? "bg-red-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-500 w-16">
                        {log.time}
                      </span>
                      <span className="text-xs text-gray-600 w-24 font-medium">
                        {log.service}
                      </span>
                      <span className="text-sm text-gray-700 flex-1">
                        {log.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Impostazioni Sistema
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Configura parametri globali e preferenze
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    💾 Salva Modifiche
                  </button>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    🔄 Reset Default
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Configurazioni Generali
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Piattaforma
                      </label>
                      <input
                        type="text"
                        defaultValue="Mind Above Charts"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Admin
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@mindovermarket.com"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fuso Orario
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                        <option value="Europe/Rome">Europa/Roma (GMT+1)</option>
                        <option value="Europe/London">
                          Europa/Londra (GMT+0)
                        </option>
                        <option value="America/New_York">
                          America/New York (GMT-5)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Prezzi & Pagamenti
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prezzo Premium (€/mese)
                      </label>
                      <input
                        type="number"
                        defaultValue="9.99"
                        step="0.01"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coaching Singolo (€)
                      </label>
                      <input
                        type="number"
                        defaultValue="80"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pacchetto 5 Sessioni (€)
                      </label>
                      <input
                        type="number"
                        defaultValue="300"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Notifiche & Comunicazioni
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Email nuovi utenti</span>
                      <button className="bg-emerald-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Notifiche nuovi trade
                      </span>
                      <button className="bg-emerald-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Alert automatici</span>
                      <button className="bg-emerald-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Report settimanali</span>
                      <button className="bg-emerald-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Backup automatico</span>
                      <button className="bg-emerald-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Modalità maintenance
                      </span>
                      <button className="bg-gray-300 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* All Modals */}
      {showContentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-90 overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                Crea Nuovo Contenuto
              </h3>
              <button
                onClick={() => setShowContentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titolo
                </label>
                <input
                  type="text"
                  value={newContent.title}
                  onChange={(e) =>
                    setNewContent({ ...newContent, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Inserisci il titolo del contenuto..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo
                  </label>
                  <select
                    value={newContent.type}
                    onChange={(e) =>
                      setNewContent({ ...newContent, type: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="analysis">📊 Analisi</option>
                    <option value="setup">🎯 Setup Trading</option>
                    <option value="course">🎓 Corso</option>
                    <option value="update">📈 Market Update</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target
                  </label>
                  <select
                    value={newContent.target}
                    onChange={(e) =>
                      setNewContent({ ...newContent, target: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="All">🌐 Tutti gli utenti</option>
                    <option value="Premium">⭐ Solo Premium</option>
                    <option value="Free">🆓 Solo Free</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenuto
                </label>
                <textarea
                  value={newContent.content}
                  onChange={(e) =>
                    setNewContent({ ...newContent, content: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-40 resize-none"
                  placeholder="Scrivi il tuo contenuto qui..."
                />
              </div>
            </div>

            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => setShowContentModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={createContent}
                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Crea Contenuto
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                Crea Nuovo Alert
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coppia Valutaria
                </label>
                <input
                  type="text"
                  value={newAlert.pair}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, pair: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Es: EUR/USD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Livello Prezzo
                </label>
                <input
                  type="text"
                  value={newAlert.level}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, level: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Es: 1.0850"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo Alert
                </label>
                <select
                  value={newAlert.type}
                  onChange={(e) =>
                    setNewAlert({ ...newAlert, type: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="Support">🟢 Support</option>
                  <option value="Resistance">🔴 Resistance</option>
                  <option value="Breakout">⚡ Breakout</option>
                  <option value="Reversal">🔄 Reversal</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => setShowAlertModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={createAlert}
                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Crea Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {showAnalysisModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                Invia Analisi ai Clienti
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Seleziona il gruppo di utenti a cui inviare l'analisi:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => sendAnalysisToUsers("all")}
                  className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-semibold text-gray-800">
                    🌐 Tutti gli Utenti
                  </div>
                  <div className="text-sm text-gray-600">
                    {stats.totalUsers} destinatari
                  </div>
                </button>

                <button
                  onClick={() => sendAnalysisToUsers("premium")}
                  className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-semibold text-gray-800">
                    ⭐ Solo Utenti Premium
                  </div>
                  <div className="text-sm text-gray-600">
                    {stats.premiumUsers} destinatari
                  </div>
                </button>

                <button
                  onClick={() => sendAnalysisToUsers("free")}
                  className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-semibold text-gray-800">
                    🆓 Solo Utenti Free
                  </div>
                  <div className="text-sm text-gray-600">
                    {stats.freeUsers} destinatari
                  </div>
                </button>
              </div>
            </div>

            <div className="p-6 border-t">
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                Crea Nuovo Corso
              </h3>
              <button
                onClick={() => setShowCourseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titolo Corso
                </label>
                <input
                  type="text"
                  placeholder="Es: Strategie Avanzate di Trading"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrizione
                </label>
                <textarea
                  placeholder="Descrivi gli obiettivi e contenuti del corso..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-24 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo Corso
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="free">🆓 Corso Gratuito</option>
                    <option value="premium">⭐ Solo Premium</option>
                    <option value="advanced">💎 Corso Avanzato</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficoltà
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option value="beginner">🟢 Principiante</option>
                    <option value="intermediate">🟡 Intermedio</option>
                    <option value="advanced">🔴 Avanzato</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durata Stimata
                </label>
                <input
                  type="text"
                  placeholder="Es: 45 minuti"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => setShowCourseModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  const newCourse = {
                    id: Date.now(),
                    title: "Nuovo Corso",
                    description: "Descrizione corso",
                    videos: [],
                    totalDuration: "0 min",
                    free: true,
                    enrollments: 0,
                    rating: 0,
                  };
                  setCourses([newCourse, ...courses]);
                  setShowCourseModal(false);
                }}
                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Crea Corso
              </button>
            </div>
          </div>
        </div>
      )}

      {showVideoModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                Aggiungi Video - {selectedCourse.title}
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titolo Video
                </label>
                <input
                  type="text"
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Es: Introduzione al Risk Management"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durata
                </label>
                <input
                  type="text"
                  value={newVideo.duration}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, duration: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Es: 12:34"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File Video
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Trascina il file video qui o</p>
                  <button className="mt-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Seleziona File
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supportati: MP4, MOV, AVI (Max 500MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex space-x-3">
              <button
                onClick={() => setShowVideoModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={() => addVideoToCourse(selectedCourse.id)}
                className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Carica Video
              </button>
            </div>
          </div>
        </div>
      )}

      {showBookingModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                Dettagli Sessione Coaching
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-purple-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {selectedBooking.userName}
                    </div>
                    <div className="text-sm text-gray-600">Cliente</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">
                      {selectedBooking.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedBooking.time}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {selectedBooking.type === "single" ? "80€" : "60€"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedBooking.type === "single"
                        ? "Sessione Singola"
                        : "Pacchetto"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-lg font-semibold ${
                        selectedBooking.status === "confirmed"
                          ? "text-emerald-600"
                          : selectedBooking.status === "pending"
                          ? "text-yellow-600"
                          : selectedBooking.status === "completed"
                          ? "text-gray-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedBooking.status === "confirmed"
                        ? "✅ Confermata"
                        : selectedBooking.status === "pending"
                        ? "⏳ In Attesa"
                        : selectedBooking.status === "completed"
                        ? "✅ Completata"
                        : "❌ Cancellata"}
                    </div>
                    <div className="text-sm text-gray-500">Stato</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Argomenti della Sessione
                  </h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedBooking.topic}
                    </p>
                  </div>

                  <h4 className="font-semibold text-gray-800 mt-4 mb-3">
                    Note Cliente
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedBooking.notes}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Azioni Rapide
                  </h4>
                  <div className="space-y-3">
                    {selectedBooking.status === "pending" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, "confirmed")
                        }
                        className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        ✅ Conferma Sessione
                      </button>
                    )}

                    {selectedBooking.status === "confirmed" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, "completed")
                        }
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        🏁 Marca come Completata
                      </button>
                    )}

                    <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                      📧 Invia Email Cliente
                    </button>

                    <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                      📅 Riprogramma Sessione
                    </button>

                    {selectedBooking.status !== "cancelled" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, "cancelled")
                        }
                        className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        ❌ Cancella Sessione
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Note Preparazione Sessione
                </h4>
                <textarea
                  placeholder="Aggiungi note per preparare la sessione..."
                  className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 h-24 resize-none text-sm"
                />
                <button className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors">
                  💾 Salva Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUserTradesModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-90 overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Trading Journal - {selectedUser.name}
                </h3>
                <p className="text-gray-600">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setShowUserTradesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-emerald-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    {selectedUser.trades}
                  </div>
                  <div className="text-sm text-gray-600">Trade Totali</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div
                    className={`text-2xl font-bold ${
                      selectedUser.totalPnL > 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedUser.totalPnL > 0 ? "+" : ""}
                    {selectedUser.totalPnL}€
                  </div>
                  <div className="text-sm text-gray-600">P&L Totale</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(Math.random() * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Win Rate</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {selectedUser.engagement}
                  </div>
                  <div className="text-sm text-gray-600">Engagement</div>
                </div>
              </div>

              {userTrades[selectedUser.id] ? (
                <div className="space-y-4">
                  {userTrades[selectedUser.id].map((trade) => (
                    <div key={trade.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              trade.pnl > 0 ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          ></div>
                          <span className="font-semibold">{trade.asset}</span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              trade.direction === "Long"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {trade.direction}
                          </span>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-bold ${
                              trade.pnl > 0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }`}
                          >
                            {trade.pnl > 0 ? "+" : ""}
                            {trade.pnl}€
                          </div>
                          <div className="text-sm text-gray-500">
                            {trade.date}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Entry/Exit:</strong> {trade.entry} →{" "}
                          {trade.exit}
                        </div>
                        <div>
                          <strong>Mindset:</strong>{" "}
                          {trade.mindset || "Non specificato"}
                        </div>
                      </div>
                      {trade.lessons && (
                        <div className="mt-2 text-sm">
                          <strong>Lezioni:</strong> {trade.lessons}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Nessun trade disponibile per questo utente
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Trading App Page
const AppPage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("journal");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(user?.isPremium || false);

  const [integrations, setIntegrations] = useState({
    mt4: { connected: false, status: "disconnected", lastSync: null },
    mt5: { connected: true, status: "connected", lastSync: "2025-08-08 14:30" },
    tradingview: { connected: false, status: "disconnected", lastSync: null },
    binance: { connected: false, status: "disconnected", lastSync: null },
    ig: { connected: false, status: "disconnected", lastSync: null },
  });

  const [autoSync, setAutoSync] = useState(true);
  const [syncLog, setSyncLog] = useState([
    {
      time: "14:30",
      message: "Trade EUR/USD importato da MT5",
      type: "success",
    },
    { time: "13:45", message: "Connessione MT5 stabilita", type: "info" },
    {
      time: "12:20",
      message: "Errore sync TradingView - token scaduto",
      type: "error",
    },
  ]);

  const [trades, setTrades] = useState([
    {
      id: 1,
      date: "2025-08-08",
      asset: "EUR/USD",
      direction: "Long",
      entry: 1.085,
      exit: 1.092,
      result: "+70 pips",
      pnl: 350,
      mindset: "Calmo e paziente, ho aspettato il setup perfetto",
      lessons: "Perfetta gestione del rischio",
      source: "MT5",
      automated: true,
      timeframe: "1H",
      lotSize: 0.1,
      commission: 2.5,
      swap: 0,
    },
    {
      id: 2,
      date: "2025-08-07",
      asset: "GBP/USD",
      direction: "Short",
      entry: 1.275,
      exit: 1.268,
      result: "+70 pips",
      pnl: 280,
      mindset: "",
      lessons: "",
      source: "TradingView",
      automated: true,
      timeframe: "4H",
      lotSize: 0.05,
      commission: 1.8,
      swap: -2,
    },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, pair: "GBP/USD", level: "1.2800", type: "Support", active: true },
    {
      id: 2,
      pair: "USD/JPY",
      level: "149.50",
      type: "Resistance",
      active: true,
    },
  ]);

  const [journalForm, setJournalForm] = useState({
    date: new Date().toISOString().split("T")[0],
    asset: "",
    direction: "Long",
    entry: "",
    exit: "",
    pnl: "",
    mindset: "",
    lessons: "",
  });

  const [showAddTradeModal, setShowAddTradeModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [showTradeDetails, setShowTradeDetails] = useState(false);
  const [editingNotes, setEditingNotes] = useState({
    mindset: false,
    lessons: false,
  });

  const calculateStats = () => {
    if (trades.length === 0)
      return { winRate: 0, avgRR: 0, totalPnL: 0, totalTrades: 0 };

    const profitable = trades.filter((t) => t.pnl > 0).length;
    const winRate = ((profitable / trades.length) * 100).toFixed(1);
    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    const avgRR = trades.length > 0 ? (totalPnL / trades.length).toFixed(2) : 0;

    return { winRate, avgRR, totalPnL, totalTrades: trades.length };
  };

  const stats = calculateStats();

  const addTrade = () => {
    if (!journalForm.asset || !journalForm.entry) return;

    const newTrade = {
      id: Date.now(),
      ...journalForm,
      entry: parseFloat(journalForm.entry),
      exit: parseFloat(journalForm.exit) || 0,
      pnl: parseFloat(journalForm.pnl) || 0,
      result:
        journalForm.pnl > 0 ? `+${journalForm.pnl}€` : `${journalForm.pnl}€`,
      source: "Manual",
      automated: false,
    };

    setTrades([newTrade, ...trades]);
    setJournalForm({
      date: new Date().toISOString().split("T")[0],
      asset: "",
      direction: "Long",
      entry: "",
      exit: "",
      pnl: "",
      mindset: "",
      lessons: "",
    });
    setShowAddTradeModal(false);
  };

  const updateTradeNotes = (tradeId, field, value) => {
    setTrades((prev) =>
      prev.map((trade) =>
        trade.id === tradeId ? { ...trade, [field]: value } : trade
      )
    );
    setSelectedTrade((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const openTradeDetails = (trade) => {
    setSelectedTrade(trade);
    setShowTradeDetails(true);
    setEditingNotes({ mindset: false, lessons: false });
  };

  const deleteTrade = (tradeId) => {
    setTrades((prev) => prev.filter((trade) => trade.id !== tradeId));
    setShowTradeDetails(false);
    setSelectedTrade(null);
  };

  const connectPlatform = (platform) => {
    setIntegrations((prev) => ({
      ...prev,
      [platform]: {
        connected: !prev[platform].connected,
        status: !prev[platform].connected ? "connected" : "disconnected",
        lastSync: !prev[platform].connected
          ? new Date().toLocaleString("it-IT")
          : null,
      },
    }));

    setSyncLog((prev) => [
      {
        time: new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: `${platform.toUpperCase()} ${
          !integrations[platform].connected ? "connesso" : "disconnesso"
        }`,
        type: !integrations[platform].connected ? "success" : "info",
      },
      ...prev.slice(0, 9),
    ]);
  };

  const manualSync = () => {
    setSyncLog((prev) => [
      {
        time: new Date().toLocaleTimeString("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: "Sincronizzazione manuale avviata...",
        type: "info",
      },
      ...prev.slice(0, 9),
    ]);

    setTimeout(() => {
      setSyncLog((prev) => [
        {
          time: new Date().toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          message: "Sincronizzazione completata - nessun nuovo trade",
          type: "success",
        },
        ...prev.slice(0, 9),
      ]);
    }, 2000);
  };

  useEffect(() => {
    if (!autoSync) return;

    const syncInterval = setInterval(() => {
      const connectedPlatforms = Object.entries(integrations).filter(
        ([_, data]) => data.connected
      );

      if (connectedPlatforms.length > 0 && Math.random() > 0.98) {
        const [platform] =
          connectedPlatforms[
            Math.floor(Math.random() * connectedPlatforms.length)
          ];

        const assets = [
          "EUR/USD",
          "GBP/USD",
          "USD/JPY",
          "GOLD",
          "BTC/USD",
          "AAPL",
          "TSLA",
        ];
        const basePrice = platform === "binance" ? 50000 : 1.08;
        const priceVariation = platform === "binance" ? 1000 : 0.02;

        const newAutoTrade = {
          id: Date.now() + Math.random(),
          date: new Date().toISOString().split("T")[0],
          asset: assets[Math.floor(Math.random() * assets.length)],
          direction: Math.random() > 0.5 ? "Long" : "Short",
          entry: (basePrice + Math.random() * priceVariation).toFixed(
            platform === "binance" ? 2 : 4
          ),
          exit: (basePrice + Math.random() * priceVariation).toFixed(
            platform === "binance" ? 2 : 4
          ),
          pnl: Math.floor((Math.random() - 0.4) * 500),
          result: "",
          source: platform.toUpperCase(),
          automated: true,
          timeframe: ["5M", "15M", "1H", "4H", "D1"][
            Math.floor(Math.random() * 5)
          ],
          lotSize: [0.01, 0.05, 0.1, 0.2, 0.5][Math.floor(Math.random() * 5)],
          commission: Math.round(Math.random() * 5 + 1),
          swap: Math.floor(Math.random() * 10 - 5),
          mindset: "",
          lessons: "",
        };

        setTrades((prev) => [newAutoTrade, ...prev]);
        setSyncLog((prev) => [
          {
            time: new Date().toLocaleTimeString("it-IT", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            message: `Trade ${newAutoTrade.asset} importato da ${newAutoTrade.source}`,
            type: "success",
          },
          ...prev.slice(0, 9),
        ]);
      }
    }, 15000);

    return () => clearInterval(syncInterval);
  }, [autoSync, integrations]);

  const Sidebar = () => (
    <div
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Mind Above Charts</h1>
              <p className="text-xs text-slate-400">{user?.name}</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {[
            { id: "journal", label: "Trading Journal", icon: BookOpen },
            { id: "integrations", label: "Integrazioni", icon: Link },
            { id: "stats", label: "Statistiche", icon: BarChart3 },
            { id: "alerts", label: "Alert Mercato", icon: Bell },
            { id: "courses", label: "Mini-Corsi", icon: Play },
            { id: "coaching", label: "Coaching 1:1", icon: User },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === id
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Premium</span>
          </div>
          <p className="text-sm text-slate-200 mb-3">
            {isPremium
              ? "Account Premium Attivo"
              : "Sblocca tutte le funzionalità avanzate"}
          </p>
          <button
            onClick={() => setIsPremium(!isPremium)}
            className="w-full bg-white text-slate-900 py-2 px-4 rounded font-semibold text-sm hover:bg-slate-100 transition-colors"
          >
            {isPremium ? "Premium Attivo ✓" : "Upgrade a Premium"}
          </button>
        </div>
      </div>
    </div>
  );

  // Trading Journal Component - COMPLETO
  const TradingJournal = () => (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <h2 className="text-2xl font-bold text-slate-800">Trading Journal</h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border">
            {autoSync ? (
              <Wifi className="w-4 h-4 text-emerald-600" />
            ) : (
              <WifiOff className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-sm font-medium text-slate-700">
              Auto-Sync {autoSync ? "ON" : "OFF"}
            </span>
            <button
              onClick={() => setAutoSync(!autoSync)}
              className={`w-8 h-4 rounded-full transition-colors relative ${
                autoSync ? "bg-emerald-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${
                  autoSync ? "translate-x-4" : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>

          <button
            onClick={manualSync}
            className="bg-slate-600 text-white p-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowAddTradeModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Trade</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-4">
        <div className="flex flex-wrap items-center gap-4">
          {Object.entries(integrations).map(([platform, data]) => (
            <div key={platform} className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  data.connected ? "bg-emerald-500" : "bg-slate-300"
                }`}
              ></div>
              <span className="text-sm font-medium text-slate-700 capitalize">
                {platform === "tradingview"
                  ? "TradingView"
                  : platform.toUpperCase()}
              </span>
              {data.connected && <Zap className="w-4 h-4 text-emerald-600" />}
            </div>
          ))}

          <button
            onClick={() => setActiveTab("integrations")}
            className="ml-auto text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors"
          >
            Gestisci →
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Operazioni Recenti</h3>
          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>{trades.length} operazioni</span>
            <span>•</span>
            <span
              className={`font-medium ${
                stats.totalPnL > 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {stats.totalPnL > 0 ? "+" : ""}
              {stats.totalPnL}€ totale
            </span>
          </div>
        </div>

        <div className="divide-y max-h-96 overflow-y-auto">
          {trades.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                Nessun trade ancora
              </h3>
              <p className="text-slate-500 mb-4">
                Inizia aggiungendo il tuo primo trade
              </p>
              <button
                onClick={() => setShowAddTradeModal(true)}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Aggiungi Primo Trade
              </button>
            </div>
          ) : (
            trades.map((trade) => (
              <div
                key={trade.id}
                className="p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => openTradeDetails(trade)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        trade.pnl > 0 ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    ></div>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-1">
                        <span className="font-semibold text-slate-800">
                          {trade.asset}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            trade.direction === "Long"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {trade.direction}
                        </span>
                        {trade.automated && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
                            <Zap className="w-3 h-3 mr-1" />
                            {trade.source}
                          </span>
                        )}
                        {trade.timeframe && (
                          <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                            {trade.timeframe}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{trade.date}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:flex lg:items-center lg:space-x-6 gap-4">
                    <div className="text-center lg:text-left">
                      <p className="text-xs text-slate-500">Entry/Exit</p>
                      <p className="font-medium">
                        {trade.entry} → {trade.exit}
                      </p>
                      {trade.lotSize && (
                        <p className="text-xs text-slate-500">
                          Lot: {trade.lotSize}
                        </p>
                      )}
                    </div>
                    <div className="text-center lg:text-right">
                      <p className="text-xs text-slate-500">P&L</p>
                      <p
                        className={`font-bold ${
                          trade.pnl > 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {trade.pnl > 0 ? "+" : ""}
                        {trade.pnl}€
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center space-x-4">
                  {trade.mindset && (
                    <div className="flex items-center text-xs text-blue-600">
                      <Brain className="w-3 h-3 mr-1" />
                      <span className="truncate max-w-32">Mindset note</span>
                    </div>
                  )}
                  {trade.lessons && (
                    <div className="flex items-center text-xs text-amber-600">
                      <Target className="w-3 h-3 mr-1" />
                      <span className="truncate max-w-32">Lezioni note</span>
                    </div>
                  )}
                  {trade.automated && (!trade.mindset || !trade.lessons) && (
                    <div className="flex items-center text-xs text-orange-600">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      <span>Note mancanti</span>
                    </div>
                  )}
                  <span className="text-xs text-slate-400 ml-auto">
                    Clicca per dettagli →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // Integrations Component - COMPLETO
  const Integrations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">
          Integrazioni Trading
        </h2>
        <button
          onClick={manualSync}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="hidden sm:inline">Sync Manuale</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          {
            platform: "mt4",
            name: "MetaTrader 4",
            description: "Importa automaticamente i trade da MT4",
            features: ["Trade history", "Real-time sync", "Position tracking"],
            setup: "Installa Expert Advisor",
          },
          {
            platform: "mt5",
            name: "MetaTrader 5",
            description: "Sincronizzazione completa con MT5",
            features: ["Trade history", "Real-time sync", "Advanced analytics"],
            setup: "Connessione API",
          },
          {
            platform: "tradingview",
            name: "TradingView",
            description: "Importa trade da TradingView alerts",
            features: ["Alert-based trades", "Paper trading", "Strategy sync"],
            setup: "Webhook connection",
          },
          {
            platform: "binance",
            name: "Binance",
            description: "Crypto trading automatico",
            features: ["Spot & Futures", "API sync", "Real-time data"],
            setup: "API Key connection",
          },
        ].map((integration) => (
          <div
            key={integration.platform}
            className="bg-white rounded-xl shadow-sm border p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {integration.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {integration.description}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    integrations[integration.platform].connected
                      ? "bg-emerald-500"
                      : "bg-slate-300"
                  }`}
                ></div>
                <span className="text-sm font-medium text-slate-700">
                  {integrations[integration.platform].connected
                    ? "Connesso"
                    : "Disconnesso"}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-sm text-slate-700">
                <strong>Setup:</strong> {integration.setup}
              </div>

              <div className="flex flex-wrap gap-1">
                {integration.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {integrations[integration.platform].lastSync && (
                <div className="text-xs text-slate-500">
                  Ultimo sync: {integrations[integration.platform].lastSync}
                </div>
              )}
            </div>

            <button
              onClick={() => connectPlatform(integration.platform)}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                integrations[integration.platform].connected
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              {integrations[integration.platform].connected
                ? "Disconnetti"
                : "Connetti"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Log Sincronizzazione</h3>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {syncLog.map((log, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  log.type === "success"
                    ? "bg-emerald-500"
                    : log.type === "error"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              ></div>
              <span className="text-xs text-slate-500 w-12">{log.time}</span>
              <span className="text-sm text-slate-700 flex-1">
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Statistics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">
        Statistiche Performance
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-emerald-600">
            {stats.winRate}%
          </div>
          <div className="text-sm text-slate-600 mt-1">Win Rate</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.avgRR}€</div>
          <div className="text-sm text-slate-600 mt-1">P&L Medio</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div
            className={`text-3xl font-bold ${
              stats.totalPnL > 0 ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {stats.totalPnL > 0 ? "+" : ""}
            {stats.totalPnL}€
          </div>
          <div className="text-sm text-slate-600 mt-1">P&L Totale</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border text-center">
          <div className="text-3xl font-bold text-slate-800">
            {stats.totalTrades}
          </div>
          <div className="text-sm text-slate-600 mt-1">Operazioni</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">
          Breakdown per Piattaforma
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(
            trades.reduce((acc, trade) => {
              const source = trade.source || "Manual";
              if (!acc[source]) acc[source] = { count: 0, pnl: 0 };
              acc[source].count++;
              acc[source].pnl += trade.pnl;
              return acc;
            }, {})
          ).map(([source, data]) => (
            <div
              key={source}
              className="text-center p-4 bg-slate-50 rounded-lg"
            >
              <div className="font-semibold text-slate-800">{source}</div>
              <div className="text-sm text-slate-600">{data.count} trade</div>
              <div
                className={`font-bold ${
                  data.pnl > 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {data.pnl > 0 ? "+" : ""}
                {data.pnl}€
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MarketAlerts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Alert di Mercato</h2>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Nuovo Alert</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Alert Attivi</h3>
        </div>

        <div className="divide-y">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    alert.active ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                ></div>
                <div>
                  <div className="font-semibold text-slate-800">
                    {alert.pair}
                  </div>
                  <div className="text-sm text-slate-600">
                    {alert.type} @ {alert.level}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  setAlerts((prev) =>
                    prev.map((a) =>
                      a.id === alert.id ? { ...a, active: !a.active } : a
                    )
                  )
                }
                className="text-slate-400 hover:text-slate-600"
              >
                {alert.active ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            name: "Sessione Asia",
            time: "01:00 - 10:00",
            status: "Chiusa",
            color: "slate",
          },
          {
            name: "Sessione Londra",
            time: "09:00 - 17:30",
            status: "Attiva",
            color: "emerald",
          },
          {
            name: "Sessione NY",
            time: "14:30 - 23:00",
            status: "Tra poco",
            color: "blue",
          },
        ].map((session, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-800">{session.name}</h4>
              <div
                className={`w-3 h-3 rounded-full ${
                  session.color === "emerald"
                    ? "bg-emerald-500"
                    : session.color === "blue"
                    ? "bg-blue-500"
                    : "bg-slate-500"
                }`}
              ></div>
            </div>
            <p className="text-sm text-slate-600 mb-1">{session.time}</p>
            <p
              className={`text-sm font-medium ${
                session.color === "emerald"
                  ? "text-emerald-600"
                  : session.color === "blue"
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
            >
              {session.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const MiniCourses = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Mini-Corsi</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          {
            title: "Psicologia del Trading",
            description: "Controlla le emozioni e migliora le decisioni",
            duration: "12 video • 45 min",
            free: true,
          },
          {
            title: "Pattern Istituzionali",
            description: "Riconosci i movimenti dei grandi player",
            duration: "8 video • 32 min",
            free: false,
          },
          {
            title: "Risk Management Avanzato",
            description: "Proteggi il capitale come un professionista",
            duration: "6 video • 28 min",
            free: false,
          },
          {
            title: "Market Structure",
            description: "Leggi il mercato come un'istituzione",
            duration: "10 video • 50 min",
            free: false,
          },
        ].map((course, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-800">
                  {course.title}
                </h3>
                {course.free && (
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 text-xs rounded-full font-medium">
                    Gratis
                  </span>
                )}
              </div>

              <p className="text-slate-600 mb-3">{course.description}</p>
              <p className="text-sm text-slate-500 mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </p>

              <button
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                  course.free || isPremium
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {course.free || isPremium
                  ? "Inizia Corso"
                  : "Sblocca con Premium"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Coaching = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Coaching 1:1</h2>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Sessioni Personalizzate</h3>
        <p className="text-blue-100 mb-4">
          Lavora direttamente con me per migliorare la tua strategia e mindset
          di trading
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center">
            <Target className="w-4 h-4 mr-1" />
            Analisi personalizzata
          </span>
          <span className="flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            Mindset coaching
          </span>
          <span className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-1" />
            Review performance
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Sessione Singola
          </h3>
          <div className="text-3xl font-bold text-emerald-600 mb-2">80€</div>
          <p className="text-slate-600 mb-6">
            Una sessione di 60 minuti via video call
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Analisi del tuo trading journal
            </li>
            <li className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Piano d'azione personalizzato
            </li>
            <li className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              Q&A sulle tue strategie
            </li>
          </ul>

          <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
            Prenota Sessione
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 relative">
          <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-xl text-sm font-medium">
            Più Popolare
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-4">
            Pacchetto 5 Sessioni
          </h3>
          <div className="flex items-baseline mb-2">
            <span className="text-3xl font-bold text-purple-600">300€</span>
            <span className="text-lg text-slate-500 line-through ml-2">
              400€
            </span>
          </div>
          <p className="text-slate-600 mb-6">
            Risparmia 100€ • 5 sessioni di 60 minuti
          </p>

          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Tutto della sessione singola
            </li>
            <li className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Piano di crescita a lungo termine
            </li>
            <li className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Supporto WhatsApp tra sessioni
            </li>
          </ul>

          <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Prenota Pacchetto
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 lg:ml-0">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden bg-slate-100 p-2 rounded-lg"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-slate-100 px-3 py-2 rounded-lg">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-slate-700">
                  Saldo: {stats.totalPnL > 0 ? "+" : ""}
                  {stats.totalPnL}€
                </span>
              </div>

              {isPremium ? (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  ⭐ Premium
                </span>
              ) : (
                <button
                  onClick={() => setIsPremium(true)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                >
                  Upgrade Premium
                </button>
              )}

              <button
                onClick={onLogout}
                className="bg-slate-100 p-2 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Settings className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "journal" && <TradingJournal />}
          {activeTab === "integrations" && <Integrations />}
          {activeTab === "stats" && <Statistics />}
          {activeTab === "alerts" && <MarketAlerts />}
          {activeTab === "courses" && <MiniCourses />}
          {activeTab === "coaching" && <Coaching />}
        </main>
      </div>

      {/* Add Trade Modal */}
      {showAddTradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-90 overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">
                Aggiungi Nuovo Trade
              </h3>
              <button
                onClick={() => setShowAddTradeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    value={journalForm.date}
                    onChange={(e) =>
                      setJournalForm({ ...journalForm, date: e.target.value })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Asset
                  </label>
                  <input
                    type="text"
                    placeholder="EUR/USD, BTC, AAPL..."
                    value={journalForm.asset}
                    onChange={(e) =>
                      setJournalForm({ ...journalForm, asset: e.target.value })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Direzione
                  </label>
                  <select
                    value={journalForm.direction}
                    onChange={(e) =>
                      setJournalForm({
                        ...journalForm,
                        direction: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="Long">Long</option>
                    <option value="Short">Short</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    P&L (€)
                  </label>
                  <input
                    type="number"
                    placeholder="350"
                    value={journalForm.pnl}
                    onChange={(e) =>
                      setJournalForm({ ...journalForm, pnl: e.target.value })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Entry
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="1.0850"
                    value={journalForm.entry}
                    onChange={(e) =>
                      setJournalForm({ ...journalForm, entry: e.target.value })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Exit
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    placeholder="1.0920"
                    value={journalForm.exit}
                    onChange={(e) =>
                      setJournalForm({ ...journalForm, exit: e.target.value })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mindset del giorno
                  </label>
                  <textarea
                    placeholder="Come ti sentivi prima/durante/dopo il trade?"
                    value={journalForm.mindset}
                    onChange={(e) =>
                      setJournalForm({
                        ...journalForm,
                        mindset: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Lezioni apprese
                  </label>
                  <textarea
                    placeholder="Cosa hai imparato da questa operazione?"
                    value={journalForm.lessons}
                    onChange={(e) =>
                      setJournalForm({
                        ...journalForm,
                        lessons: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent h-24 resize-none"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAddTradeModal(false)}
                  className="flex-1 bg-slate-200 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={addTrade}
                  className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Aggiungi Trade
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trade Details Modal */}
      {showTradeDetails && selectedTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-90 overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold text-slate-800">
                  Analisi Trade Dettagliata
                </h3>
                <span className="text-sm text-slate-500">
                  #{selectedTrade.id}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => deleteTrade(selectedTrade.id)}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowTradeDetails(false)}
                  className="text-slate-400 hover:text-slate-600 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">
                      {selectedTrade.asset}
                    </div>
                    <div
                      className={`text-sm font-medium mt-1 ${
                        selectedTrade.direction === "Long"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedTrade.direction}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-700">
                      {selectedTrade.entry} → {selectedTrade.exit}
                    </div>
                    <div className="text-sm text-slate-500">Entry / Exit</div>
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold ${
                        selectedTrade.pnl > 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {selectedTrade.pnl > 0 ? "+" : ""}
                      {selectedTrade.pnl}€
                    </div>
                    <div className="text-sm text-slate-500">P&L</div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-700">
                      {selectedTrade.date}
                    </div>
                    <div className="text-sm text-slate-500">Data</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-semibold text-slate-800 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-blue-600" />
                      Mindset e Psicologia
                    </label>
                    <button
                      onClick={() =>
                        setEditingNotes((prev) => ({
                          ...prev,
                          mindset: !prev.mindset,
                        }))
                      }
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  {editingNotes.mindset ? (
                    <div>
                      <textarea
                        value={selectedTrade.mindset || ""}
                        onChange={(e) =>
                          updateTradeNotes(
                            selectedTrade.id,
                            "mindset",
                            e.target.value
                          )
                        }
                        placeholder="Come ti sentivi prima/durante/dopo il trade?"
                        className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none text-sm"
                      />
                      <button
                        onClick={() =>
                          setEditingNotes((prev) => ({
                            ...prev,
                            mindset: false,
                          }))
                        }
                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-3 h-3 inline mr-1" />
                        Salva
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-700">
                      {selectedTrade.mindset || (
                        <span className="text-slate-400 italic">
                          Clicca l'icona per aggiungere note sul mindset...
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-semibold text-slate-800 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-amber-600" />
                      Lezioni e Miglioramenti
                    </label>
                    <button
                      onClick={() =>
                        setEditingNotes((prev) => ({
                          ...prev,
                          lessons: !prev.lessons,
                        }))
                      }
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                  {editingNotes.lessons ? (
                    <div>
                      <textarea
                        value={selectedTrade.lessons || ""}
                        onChange={(e) =>
                          updateTradeNotes(
                            selectedTrade.id,
                            "lessons",
                            e.target.value
                          )
                        }
                        placeholder="Cosa hai imparato? Cosa faresti diversamente?"
                        className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32 resize-none text-sm"
                      />
                      <button
                        onClick={() =>
                          setEditingNotes((prev) => ({
                            ...prev,
                            lessons: false,
                          }))
                        }
                        className="mt-2 bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700 transition-colors"
                      >
                        <Save className="w-3 h-3 inline mr-1" />
                        Salva
                      </button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-700">
                      {selectedTrade.lessons || (
                        <span className="text-slate-400 italic">
                          Clicca l'icona per aggiungere lezioni apprese...
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {selectedTrade.automated && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Trade Importato Automaticamente
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Questo trade è stato importato da{" "}
                    <strong>{selectedTrade.source}</strong>. Aggiungi le tue
                    note psicologiche per completare l'analisi.
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setShowTradeDetails(false)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const { user, isAuthenticated, isAdmin, login, logout, register } = useAuth();

  if (isAuthenticated && isAdmin) {
    return <AdminPage user={user} onLogout={logout} />;
  }

  if (isAuthenticated) {
    return <AppPage user={user} onLogout={logout} />;
  }

  return <AuthPage onLogin={login} onRegister={register} />;
};

export default App;
