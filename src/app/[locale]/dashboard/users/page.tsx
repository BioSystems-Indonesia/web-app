"use client";

import { useState, useEffect } from "react";
import { UserRole } from "@prisma/client";
import axios from "axios";
import "./page.css";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [filterRole, setFilterRole] = useState<UserRole | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
    role: "ADMIN" as UserRole,
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    verifyPassword: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user");
      setUsers(response.data.data || []);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to fetch users");
      }
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        username: user.username,
        password: "",
        verifyPassword: "",
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        verifyPassword: "",
        role: "ADMIN",
      });
    }
    setShowModal(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsClosing(false);
      setEditingUser(null);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser && formData.password !== formData.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      if (editingUser) {
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };
        await axios.put(`/api/user/${editingUser.id}`, updateData);
      } else {
        await axios.post("/api/user", formData);
      }

      await fetchUsers();
      closeModal();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to save user");
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/user/${id}`);
      await fetchUsers();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to delete user");
      }
    }
  };

  const openPasswordModal = (user: User) => {
    setSelectedUserForPassword(user);
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      verifyPassword: "",
    });
    setShowPasswordModal(true);
    setIsClosing(false);
  };

  const closePasswordModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPasswordModal(false);
      setIsClosing(false);
      setSelectedUserForPassword(null);
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        verifyPassword: "",
      });
    }, 300);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordFormData.newPassword !== passwordFormData.verifyPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (!selectedUserForPassword) return;

    try {
      await axios.put("/api/auth", {
        username: selectedUserForPassword.username,
        currentPassword: passwordFormData.currentPassword,
        newPassword: passwordFormData.newPassword,
        verifyPassword: passwordFormData.verifyPassword,
      });

      alert("Password updated successfully!");
      closePasswordModal();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to update password");
      }
    }
  };

  const openDetailModal = (user: User) => {
    setViewingUser(user);
    setShowDetailModal(true);
    setIsClosing(false);
  };

  const closeDetailModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowDetailModal(false);
      setIsClosing(false);
      setViewingUser(null);
    }, 300);
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = filterRole === "ALL" || user.role === filterRole;
    const searchMatch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    return roleMatch && searchMatch;
  });

  const getRoleBadgeClass = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "admin";
      case "HUMAN_RESOURCE":
        return "hr";
      case "PRODUCT_SPECIALIST":
        return "ps";
      case "DG":
        return "dg"
      default:
        return "admin";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "HUMAN_RESOURCE":
        return "Human Resource";
      case "PRODUCT_SPECIALIST":
        return "Product Specialist";
      case "DG":
        return "Desain Grafis"
      default:
        return role;
    }
  };

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>User Management</h1>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => openModal()}>
            + Add User
          </button>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by name, email, or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              fontSize: "0.95rem",
              minWidth: "300px",
            }}
          />
        </div>

        <div className="filter-group">
          <label>Role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | "ALL")}
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="HUMAN_RESOURCE">Human Resource</option>
            <option value="PRODUCT_SPECIALIST">Product Specialist</option>
            <option value="DG">Desain Grafik</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="clickable-row" onClick={() => openDetailModal(user)}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <span className={`badge ${getRoleBadgeClass(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn-edit"
                      onClick={() => openModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-password"
                      onClick={() => openPasswordModal(user)}
                    >
                      Password
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div
          className={`modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={closeModal}
        >
          <div
            className={`modal ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Username *</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                    disabled={!!editingUser}
                  />
                </div>

                {!editingUser && (
                  <>
                    <div className="form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Verify Password *</label>
                      <input
                        type="password"
                        value={formData.verifyPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            verifyPassword: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as UserRole,
                      })
                    }
                    required
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="HUMAN_RESOURCE">Human Resource</option>
                    <option value="PRODUCT_SPECIALIST">Product Specialist</option>
                    <option value="DG">Desain Grafis</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingUser ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPasswordModal && selectedUserForPassword && (
        <div
          className={`modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={closePasswordModal}
        >
          <div
            className={`modal ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Update Password - {selectedUserForPassword.name}</h2>
              <button className="modal-close" onClick={closePasswordModal}>
                ×
              </button>
            </div>

            <form onSubmit={handlePasswordUpdate}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Current Password *</label>
                  <input
                    type="password"
                    value={passwordFormData.currentPassword}
                    onChange={(e) =>
                      setPasswordFormData({
                        ...passwordFormData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>New Password *</label>
                  <input
                    type="password"
                    value={passwordFormData.newPassword}
                    onChange={(e) =>
                      setPasswordFormData({
                        ...passwordFormData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Verify New Password *</label>
                  <input
                    type="password"
                    value={passwordFormData.verifyPassword}
                    onChange={(e) =>
                      setPasswordFormData({
                        ...passwordFormData,
                        verifyPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closePasswordModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && viewingUser && (
        <div
          className={`modal-overlay ${isClosing ? "closing" : ""}`}
          onClick={closeDetailModal}
        >
          <div
            className={`modal modal-detail ${isClosing ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>User Detail</h2>
              <button className="modal-close" onClick={closeDetailModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Basic Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>User ID:</label>
                    <span>{viewingUser.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>Full Name:</label>
                    <span>{viewingUser.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{viewingUser.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Username:</label>
                    <span>{viewingUser.username}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Role & Permissions</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Role:</label>
                    <span>
                      <span className={`badge ${getRoleBadgeClass(viewingUser.role)}`}>
                        {getRoleLabel(viewingUser.role)}
                      </span>
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Access Level:</label>
                    <span>
                      {viewingUser.role === "ADMIN" && "Full Access"}
                      {viewingUser.role === "PRODUCT_SPECIALIST" && "Products, Posts, Events"}
                      {viewingUser.role === "HUMAN_RESOURCE" && "Career Management"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Account Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Created At:</label>
                    <span>{new Date(viewingUser.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Last Updated:</label>
                    <span>{new Date(viewingUser.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeDetailModal}>
                Close
              </button>
              <button className="btn-edit" onClick={() => {
                closeDetailModal();
                openModal(viewingUser);
              }}>
                Edit User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
