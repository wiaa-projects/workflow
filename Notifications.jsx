import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} from "../store/notificationsSlice";

function Notifications() {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state) => state.notifications
  );

  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationClick = (id) => {
    dispatch(markAsRead(id));
  };

  return (
    <div className="notifications-wrapper">
      <button
        className="notification-button"
        onClick={() => setOpen(!open)}
        type="button"
      >
        🔔

        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <div>
              <h3>Notifications</h3>
              <span>
                {unreadCount} unread
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                dispatch(markAllAsRead())
              }
            >
              Mark all as read
            </button>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    notification.read
                      ? "read"
                      : "unread"
                  }`}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id
                    )
                  }
                >
                  <div className="notification-content">
                    <strong>
                      {notification.message}
                    </strong>

                    <span>
                      {notification.date}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        deleteNotification(
                          notification.id
                        )
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notifications-footer">
              <button
                type="button"
                onClick={() =>
                  dispatch(clearNotifications())
                }
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;