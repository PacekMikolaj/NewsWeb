import { Outlet, useNavigation } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./AppLayout.less";
import Loader from "../../components/UI/Loader/Loader";

const AppLayout = () => {
  const navigaton = useNavigation();
  const isLoading = navigaton.state === "loading";
  console.log(navigaton);

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
