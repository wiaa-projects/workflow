import { useSelector, useDispatch } from "react-redux";
import {
  addMember,
  updateMember,
  deleteMember,
} from "../store/teamSlice";
import { addNotification } from "../store/notificationsSlice";
import { sendNotificationEmail } from "../services/emailService";
import { useState } from "react";

function Team() {
  const members = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [projects, setProjects] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const resetForm = () => {
    setName("");
    setRole("");
    setEmail("");
    setProjects(0);
    setEditingId(null);
    setError("");
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("Member name is required.");
      return false;
    }

    if (name.trim().length < 3) {
      setError(
        "Member name must contain at least 3 characters."
      );
      return false;
    }

    if (!role.trim()) {
      setError("Role is required.");
      return false;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return false;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (Number(projects) < 0) {
      setError(
        "Projects number cannot be negative."
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const member = {
      id: editingId || Date.now(),
      name: name.trim(),
      role: role.trim(),
      email: email.trim(),
      projects: Number(projects),
    };

    if (editingId) {
      dispatch(updateMember(member));

      dispatch(
        addNotification({
          message: `Team member "${name}" updated successfully.`,
          type: "info",
        })
      );

      await sendNotificationEmail({
        title: "Team Member Updated",
        message: `Team member "${name}" has been updated successfully.`,
      });
    } else {
      dispatch(addMember(member));

      dispatch(
        addNotification({
          message: `Team member "${name}" added successfully.`,
          type: "success",
        })
      );

      await sendNotificationEmail({
        title: "New Team Member Added",
        message: `A new team member "${name}" has been added to WorkFlow.`,
      });
    }

    resetForm();
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setEmail(member.email);
    setProjects(member.projects);
    setError("");
  };

  const handleDelete = async (id) => {
    const member = members.find(
      (item) => item.id === id
    );

    dispatch(deleteMember(id));

    if (member) {
      dispatch(
        addNotification({
          message: `Team member "${member.name}" deleted.`,
          type: "warning",
        })
      );

      await sendNotificationEmail({
        title: "Team Member Deleted",
        message: `Team member "${member.name}" has been deleted from WorkFlow.`,
      });
    }
  };

  const roles = [
    ...new Set(
      members.map((member) => member.role)
    ),
  ];

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      member.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      member.role
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      filterRole === "All" ||
      member.role === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Team</h1>
        <p>Manage your team members.</p>
      </div>

      <form
        className="team-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Member name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setError("");
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        <input
          type="number"
          min="0"
          placeholder="Projects"
          value={projects}
          onChange={(e) => {
            setProjects(e.target.value);
            setError("");
          }}
        />

        <button type="submit">
          {editingId
            ? "Update Member"
            : "Add Member"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="team-filters">
        <input
          type="text"
          placeholder="Search team members..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filterRole}
          onChange={(e) =>
            setFilterRole(e.target.value)
          }
        >
          <option value="All">All Roles</option>

          {roles.map((roleName) => (
            <option
              key={roleName}
              value={roleName}
            >
              {roleName}
            </option>
          ))}
        </select>
      </div>

      <div className="team-grid">
        {filteredMembers.length === 0 ? (
          <div className="empty-state">
            <h2>No team members found</h2>
            <p>
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              className="team-card"
              key={member.id}
            >
              <div className="avatar">
                {member.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <h3>{member.name}</h3>

              <p className="team-role">
                {member.role}
              </p>

              <p className="team-email">
                {member.email}
              </p>

              <div className="team-projects">
                <span>Projects</span>

                <strong>
                  {member.projects}
                </strong>
              </div>

              <div className="team-actions">
                <button
                  className="edit-button"
                  onClick={() =>
                    handleEdit(member)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(member.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Team;