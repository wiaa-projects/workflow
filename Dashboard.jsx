import { useSelector } from "react-redux";

function Dashboard() {
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const team = useSelector((state) => state.team);
  const notifications = useSelector(
    (state) => state.notifications
  );

  const totalProjects = projects.length;

  const activeTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const totalTeamMembers = team.length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (total, project) =>
              total + Number(project.progress),
            0
          ) / projects.length
        )
      : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back to WorkFlow. Here's your
            project overview.
          </p>
        </div>
      </div>

      {/* Statistics */}

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Projects</span>
          <strong>{totalProjects}</strong>
          <small>
            {completedProjects} completed
          </small>
        </div>

        <div className="stat-card">
          <span>Active Tasks</span>
          <strong>{activeTasks}</strong>
          <small>
            Tasks to complete
          </small>
        </div>

        <div className="stat-card">
          <span>Completed Tasks</span>
          <strong>{completedTasks}</strong>
          <small>
            Tasks completed
          </small>
        </div>

        <div className="stat-card">
          <span>Team Members</span>
          <strong>{totalTeamMembers}</strong>
          <small>
            Active members
          </small>
        </div>
      </div>

      {/* Project Progress */}

      <div className="dashboard-grid">
        <div className="recent-section">
          <div className="section-header">
            <h2>Project Progress</h2>
            <span>{averageProgress}% average</span>
          </div>

          <div className="project-list">
            {projects.length === 0 ? (
              <div className="empty-state">
                <h2>No projects</h2>
                <p>
                  Add your first project from the
                  Projects page.
                </p>
              </div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div
                  className="project-item"
                  key={project.id}
                >
                  <div className="project-info">
                    <h3>{project.name}</h3>

                    <p>
                      {project.description}
                    </p>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="project-progress">
                    <strong>
                      {project.progress}%
                    </strong>

                    <span>
                      {project.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Tasks */}

        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Tasks</h2>
            <span>
              {tasks.length} total
            </span>
          </div>

          <div className="dashboard-tasks">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <h2>No tasks</h2>
                <p>
                  Add tasks from the Tasks page.
                </p>
              </div>
            ) : (
              tasks.slice(0, 5).map((task) => (
                <div
                  className="dashboard-task"
                  key={task.id}
                >
                  <div>
                    <h3>{task.title}</h3>

                    <p>{task.project}</p>
                  </div>

                  <div className="dashboard-task-meta">
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
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}

      <div className="recent-section activity-section">
        <div className="section-header">
          <h2>Recent Activity</h2>

          <span>
            {notifications.length} notifications
          </span>
        </div>

        <div className="activity-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <h2>No recent activity</h2>
              <p>
                Your project activity will appear here.
              </p>
            </div>
          ) : (
            notifications
              .slice(0, 5)
              .map((notification) => (
                <div
                  className={`activity-item ${
                    notification.read
                      ? "read"
                      : "unread"
                  }`}
                  key={notification.id}
                >
                  <div className="activity-dot"></div>

                  <div>
                    <strong>
                      {notification.message}
                    </strong>

                    <span>
                      {notification.date}
                    </span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;