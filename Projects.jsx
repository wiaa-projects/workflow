import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  deleteProject,
  updateProject,
} from "../store/projectsSlice";
import { addNotification } from "../store/notificationsSlice";
import { sendNotificationEmail } from "../services/emailService";
import { useState } from "react";

function Projects() {
  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("To Do");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const resetForm = () => {
    setName("");
    setDescription("");
    setProgress(0);
    setStatus("To Do");
    setEditingId(null);
    setError("");
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("Project name is required.");
      return false;
    }

    if (name.trim().length < 3) {
      setError(
        "Project name must contain at least 3 characters."
      );
      return false;
    }

    if (!description.trim()) {
      setError("Project description is required.");
      return false;
    }

    if (
      Number(progress) < 0 ||
      Number(progress) > 100
    ) {
      setError(
        "Progress must be between 0 and 100."
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

    const project = {
      id: editingId || Date.now(),
      name: name.trim(),
      description: description.trim(),
      progress: Number(progress),
      status,
    };

    if (editingId) {
      dispatch(updateProject(project));

      dispatch(
        addNotification({
          message: `Project "${name}" updated successfully.`,
          type: "info",
        })
      );

      await sendNotificationEmail({
        title: "Project Updated",
        message: `Project "${name}" has been updated successfully.`,
      });
    } else {
      dispatch(addProject(project));

      dispatch(
        addNotification({
          message: `Project "${name}" added successfully.`,
          type: "success",
        })
      );

      await sendNotificationEmail({
        title: "New Project Added",
        message: `A new project "${name}" has been added to WorkFlow.`,
      });
    }

    resetForm();
  };

  const handleEditProject = (project) => {
    setEditingId(project.id);
    setName(project.name);
    setDescription(project.description);
    setProgress(project.progress);
    setStatus(project.status);
    setError("");
  };

  const handleDeleteProject = async (id) => {
    const project = projects.find(
      (item) => item.id === id
    );

    dispatch(deleteProject(id));

    if (project) {
      dispatch(
        addNotification({
          message: `Project "${project.name}" deleted.`,
          type: "warning",
        })
      );

      await sendNotificationEmail({
        title: "Project Deleted",
        message: `Project "${project.name}" has been deleted from WorkFlow.`,
      });
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      project.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Projects</h1>
        <p>Manage and track your projects.</p>
      </div>

      <form
        className="project-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

        <input
          type="text"
          placeholder="Project description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
        />

        <input
          type="number"
          placeholder="Progress"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => {
            setProgress(e.target.value);
            setError("");
          }}
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>

        <button type="submit">
          {editingId
            ? "Update Project"
            : "Add Project"}
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

      <div className="project-filters">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value)
          }
        >
          <option value="All">
            All Statuses
          </option>
          <option value="To Do">To Do</option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state">
          <h2>No projects found</h2>
          <p>
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              className="project-card"
              key={project.id}
            >
              <div className="project-top">
                <h3>{project.name}</h3>
                <span>{project.status}</span>
              </div>

              <p>{project.description}</p>

              <div className="progress-info">
                <span>Progress</span>
                <strong>
                  {project.progress}%
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${project.progress}%`,
                  }}
                ></div>
              </div>

              <div className="project-actions">
                <button
                  className="edit-button"
                  onClick={() =>
                    handleEditProject(project)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDeleteProject(
                      project.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;