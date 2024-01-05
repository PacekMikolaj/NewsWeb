import React, { useState, useEffect } from "react";
import { Popover } from "react-tiny-popover";
import { useContext } from "react";
import { UserContext } from "../../../UserContext";
import { listenForNotifications } from "../../../services/notificationsAPI";
import "./Notifications.less";
import notificationIcon from "../../../assets/notification-icon.svg";
import { Notification as NotificationType } from "../../../services/notificationsAPI";
import NotificationsContent from "./NotificationsContent";
import { motion } from "framer-motion";

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
        content={
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: -20 }}
            className="notification__container__popover"
          >
            <h6>Notifications</h6>
            {!notifications.length ? (
              <p className="notification__container__popover__info">All caught up! Check back later.</p>
            ) : (
              <NotificationsContent notifications={notifications} />
            )}
          </motion.div>
        }
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
