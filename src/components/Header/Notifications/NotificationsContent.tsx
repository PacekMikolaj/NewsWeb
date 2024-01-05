import React from "react";
import { Notification as NotificationType } from "../../../services/notificationsAPI";
import { useNavigate } from "react-router-dom";
import "./NotificationsContent.less";
import { deleteUserFromNotification } from "../../../services/notificationsAPI";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";

const NotificationsContent = ({
  notifications,
}: {
  notifications: NotificationType[];
}) => {
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();

  const notificationClick = (notification: NotificationType) => {
    if (notification.id && userData.id) {
      deleteUserFromNotification(notification.id, userData.id);
    }
    navigate("/article/" + notification.articleId);
  };

  return (
    <div className="notifications-content__container">
      {notifications.map((notification) => (
        <div
          onClick={() => notificationClick(notification)}
          key={notification.id}
        >
          <div className="notifications-content__notification">
            <div className="notifications-content__notification__dot"></div>
            <div>
            <p className="notifications-content__notification__content">
              {notification.content}
            </p>
            <p className="notifications-content__notification__date">
              {notification.date}
            </p>
            </div>

            {/* to jest przycisk X na klocku xD */}
            <img
              onClick={() =>
                deleteUserFromNotification(
                  notification.id as string,
                  userData.id as string
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsContent;
