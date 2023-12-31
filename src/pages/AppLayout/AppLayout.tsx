import { Outlet, useNavigation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./AppLayout.less";
import Loader from "../../components/UI/Loader/Loader";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useEffect } from "react";
import { listenForNotifications } from "../../services/notificationsAPI";

const AppLayout = () => {
  const { userData } = useContext(UserContext);
  const navigaton = useNavigation();
  const isLoading = navigaton.state === "loading";

  useEffect(() => {
    if (userData.id) {
      const unsubscribe = listenForNotifications(userData.id);
      return () => unsubscribe();
    }
  }, [userData]);

  return (
    <div
      className="layout"
      style={isLoading ? { height: "100vh", overflow: "hidden" } : {}}
    >
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
