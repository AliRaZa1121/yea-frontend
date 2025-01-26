import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthService } from "../../../../services/auth.service";
import { RoutePaths } from "../../../../utilities/constant/appRoutes";
import { LOCAL_STORAGE_KEYS } from "../../../../utilities/constant/localStorageKeys";
import { AuthRegister } from "../../../../utilities/interface/auth.interface";
import "../auth.scss";
import { saveToLocal } from "../../../../utilities/helper/localStorageHelper";

const SignUp = () => {

  const [loginLoader, setLoginLoader] = useState(false);

  const onFinish = async (values: AuthRegister) => {
    console.log("Received values of form: ", values);
    setLoginLoader(true);

    try {
      const { data } = await AuthService.register(values);
      if (data) {
        const authToken = {
          accessToken: data?.data?.accessToken,
          refreshToken: data?.data?.refreshToken,
      };

      const user = data?.data?.user;

      saveToLocal(LOCAL_STORAGE_KEYS.AUTH_USER, user, { isJson: true, isEncrypted: true });
      saveToLocal(LOCAL_STORAGE_KEYS.AUTH_TOKEN, authToken, { isJson: true, isEncrypted: true });
        window.location.href = RoutePaths.Dashboard.INDEX;
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setLoginLoader(false);
    }
  };

  return (
    <section
      className="auth-screen d-flex justify-content-center align-items-center"
    >
      <div className="overlay d-flex justify-content-center align-items-center">
        <div className="light auth-screen__wrapper d-flex flex-column justify-content-center align-items-center">


          <Form
            name="normal_login"
            className="auth-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >

            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email Address!" },
                { type: "email", message: "Please enter a valid Email Address" }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Password must be at least 8 characters long" },
                { pattern: new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), message: "Password must contain at least 1 letter, 1 number and 1 special character" }
              ]}
            >
              {/* • Minimum length of 8 characters
                • Contains at least 1 letter.
                • Contains at least 1 number.
                • Contains at least 1 special character. */}
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <div className="d-flex justify-content-end">
                <Link to={RoutePaths.Auth.FORGOT_EMAIL} className="auth-form-forgot">
                  Forgot password
                </Link>
              </div>
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="auth-form-button w-100"
                loading={loginLoader}
              >
                Register
              </Button>
            </Form.Item>

            <Form.Item className="text-center">
              <Link to={RoutePaths.Auth.LOGIN} className="auth-form-forgot">
                Back to Login
              </Link>
            </Form.Item>

          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
