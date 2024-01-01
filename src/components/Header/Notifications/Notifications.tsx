import React, { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { listenForNotifications } from "../../../services/notificationsAPI";
import "./Notifications.less";
import notificationIcon from "../../../assets/notification-icon.svg";
import { Notification as NotificationType } from "../../../services/notificationsAPI";
import NotificationsContent from "./NotificationsContent";

const Notifications = () => {
  const { userData } = useContext(UserContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (userData.id) {
      const unsubscribe = listenForNotifications(
        userData.id,
        setHasNewNotification,
        setNotifications
      );
      return () => unsubscribe();
    }
  }, [userData]);

  return (
    <div
      className={`notification__container ${
        hasNewNotification ? "notification__new-notification" : ""
      }`}
    >
      <Popover
        isOpen={isPopoverOpen}
        positions={["bottom"]}
        onClickOutside={() => setIsPopoverOpen(false)}
        content={<NotificationsContent notifications={notifications} />}
      >
        <img
          className="notification__icon"
          src={notificationIcon}
          alt="notification icon"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        />
      </Popover>
    </div>
  );
};

export default Notifications;
