import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  updateTask,
} from "../store/tasksSlice";
import { addNotification } from "../store/notificationsSlice";
import { sendNotificationEmail } from "../services/emailService";
import { useState } from "react";

function Tasks() {
  const tasks = useSelector((state) => state.tasks);
  const projects = useSelector((state) => state.projects);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");
  const [deadline, setDeadline] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  const resetForm = () => {
    setTitle("");
    setProject("");
    setPriority("Medium");
    setStatus("To Do");
    setDeadline("");
    setEditingId(null);
    setError("");
  };

  const validateForm = () => {
    if (!title.trim()) {
      setError("Task title is required.");
      return false;
    }

    if (title.trim().length < 3) {
      setError(
        "Task title must contain at least 3 characters."
      );
      return false;
    }

    if (!project) {
      setError("Please select a project.");
      return false;
    }

    if (!deadline.trim()) {
      setError("Deadline is required.");
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

    const task = {
      id: editingId || Date.now(),
      title: title.trim(),
      project,
      priority,
      status,
      deadline: deadline.trim(),
    };

    if (editingId) {
      dispatch(updateTask(task));

      dispatch(
        addNotification({
          message: `Task "${title}" updated successfully.`,
          type: "info",
        })
      );

      await sendNotificationEmail({
        title: "Task Updated",
        message: `Task "${title}" has been updated successfully.`,
      });
    } else {
      dispatch(addTask(task));

      dispatch(
        addNotification({
          message: `Task "${title}" added successfully.`,
          type: "success",
        })
      );

      await sendNotificationEmail({
        title: "New Task Added",
        message: `A new task "${title}" has been added to WorkFlow.`,
      });
    }

    resetForm();
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setProject(task.project);
    setPriority(task.priority);
    setStatus(task.status);
    setDeadline(task.deadline);
    setError("");
  };

  const handleDelete = async (id) => {
    const task = tasks.find(
      (item) => item.id === id
    );

    dispatch(deleteTask(id));

    if (task) {
      dispatch(
        addNotification({
          message: `Task "${task.title}" deleted.`,
          type: "warning",
        })
      );

      await sendNotificationEmail({
        title: "Task Deleted",
        message: `Task "${task.title}" has been deleted from WorkFlow.`,
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.project
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      task.status === filterStatus;

    const matchesPriority =
      filterPriority === "All" ||
      task.priority === filterPriority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Tasks</h1>
        <p>Manage and track your tasks.</p>
      </div>

      <form
        className="task-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />

        <select
          value={project}
          onChange={(e) => {
            setProject(e.target.value);
            setError("");
          }}
        >
          <option value="">
            Select a project
          </option>

          {projects.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

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

        <input
          type="text"
          placeholder="Deadline (ex: 30 Sep 2026)"
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
            setError("");
          }}
        />

        <button type="submit">
          {editingId
            ? "Update Task"
            : "Add Task"}
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

      <div className="task-filters">
        <input
          type="text"
          placeholder="Search tasks..."
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

        <select
          value={filterPriority}
          onChange={(e) =>
            setFilterPriority(e.target.value)
          }
        >
          <option value="All">
            All Priorities
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <h2>No tasks found</h2>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              className="task-card"
              key={task.id}
            >
              <div className="task-main">
                <h3>{task.title}</h3>
                <p>{task.project}</p>
              </div>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

              <span
                className={`status ${task.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {task.status}
              </span>

              <span className="deadline">
                {task.deadline}
              </span>

              <div className="task-actions">
                <button
                  className="edit-button"
                  onClick={() =>
                    handleEdit(task)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(task.id)
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

export default Tasks;