import { LogoutOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { DashboardService } from "../../../services/dashboard.service";
import { RoutePaths } from "../../../utilities/constant/appRoutes";
import { LOCAL_STORAGE_KEYS } from "../../../utilities/constant/localStorageKeys";
import "./dashboard.scss";
import { removeFromLocal } from "../../../utilities/helper/localStorageHelper";

const { confirm } = Modal;

const Dashboard = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const logoutHandler = () => {
    confirm({
      title: "Are you sure you want to Logout?",
      icon: <LogoutOutlined />,
      content: "",
      async onOk() {
        removeFromLocal(LOCAL_STORAGE_KEYS.AUTH_USER);
        removeFromLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

        window.location.href = RoutePaths.Auth.LOGIN;
      },
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await DashboardService.welcomeMessage();
        console.log("user", user);
        if (user) {
          setWelcomeMessage(user.data.message);
        }
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="welcome-page">
      <h1>{welcomeMessage}</h1>

      <Button
        type="primary"
        className="auth-form-button"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
