import { sendNotificationEmail } from "../services/emailService";
import { useEffect, useState } from "react";

function Settings() {
  const [name, setName] = useState(() => {
    return (
      localStorage.getItem("workflow_name") ||
      "WorkFlow Admin"
    );
  });

  const [email, setEmail] = useState(() => {
    return (
      localStorage.getItem("workflow_email") ||
      "admin@workflow.com"
    );
  });

  const [notifications, setNotifications] = useState(
    () => {
      const saved =
        localStorage.getItem(
          "workflow_notifications_enabled"
        );

      return saved !== null
        ? JSON.parse(saved)
        : true;
    }
  );

  const [darkMode, setDarkMode] = useState(() => {
    const saved =
      localStorage.getItem("workflow_dark_mode");

    return saved !== null
      ? JSON.parse(saved)
      : false;
  });

  useEffect(() => {
    localStorage.setItem(
      "workflow_name",
      name
    );
  }, [name]);

  useEffect(() => {
    localStorage.setItem(
      "workflow_email",
      email
    );
  }, [email]);

  useEffect(() => {
    localStorage.setItem(
      "workflow_notifications_enabled",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "workflow_dark_mode",
      JSON.stringify(darkMode)
    );

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "workflow_name",
      name
    );

    localStorage.setItem(
      "workflow_email",
      email
    );

    localStorage.setItem(
      "workflow_notifications_enabled",
      JSON.stringify(notifications)
    );

    localStorage.setItem(
      "workflow_dark_mode",
      JSON.stringify(darkMode)
    );

    alert("Settings saved successfully!");
  };

  const handleTestEmail = async () => {
    const success = await sendNotificationEmail({
      title: "Test Email",
      message:
        "This is a test notification from your WorkFlow application.",
    });

    if (success) {
      alert("Test email sent successfully!");
    } else {
      alert("Failed to send test email. Check the browser console.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Settings</h1>
        <p>
          Manage your WorkFlow preferences.
        </p>
      </div>

      <div className="settings-container">
        <form
          className="settings-card"
          onSubmit={handleSave}
        >
          <div className="settings-section">
            <h2>Profile Settings</h2>

            <p>
              Update your account information.
            </p>

            <div className="settings-field">
              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="settings-field">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
          </div>

          <div className="settings-section">
            <h2>Preferences</h2>

            <p>
              Customize your WorkFlow experience.
            </p>

            <div className="settings-option">
              <div>
                <strong>
                  Email Notifications
                </strong>

                <span>
                  Receive notifications about your
                  projects and tasks.
                </span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) =>
                    setNotifications(
                      e.target.checked
                    )
                  }
                />

                <span className="slider"></span>
              </label>
            </div>

            <div className="settings-option">
              <div>
                <strong>
                  Dark Mode
                </strong>

                <span>
                  Enable dark mode for the dashboard.
                </span>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) =>
                    setDarkMode(
                      e.target.checked
                    )
                  }
                />

                <span className="slider"></span>
              </label>
            </div>
          </div>

          <button
            className="settings-save"
            type="submit"
          >
            Save Changes
          </button>

          <button
            className="settings-save"
            type="button"
            onClick={handleTestEmail}
          >
            Test Email Notification
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;