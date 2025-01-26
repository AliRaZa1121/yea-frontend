import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthService } from "../../../../services/auth.service";
import { RoutePaths } from "../../../../utilities/constant/appRoutes";
import { AuthResetPassword } from "../../../../utilities/interface/auth.interface";
import "../auth.scss";

const ResetPassword = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [token, setToken] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      window.location.href = RoutePaths.Auth.LOGIN;
    }
    setToken(tokenFromUrl || "");
  }, [location.search]);

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    try {
      setLoading(true);
      const dataToSend: AuthResetPassword = {
        password: values.password,
        token: token,
      };

      const { data } = await AuthService.resetPassword(dataToSend);

      if (data) {
        message.success("Password has been changed successfully.");
        setTimeout(() => {
          window.location.href = RoutePaths.Auth.LOGIN;
        }, 2000);
      }
    } catch (error) {
      console.error("Forget Password error: ", error);
    } finally {
      setLoading(false);
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
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
                { min: 8, message: "Password must be at least 8 characters long" },
                { pattern: new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), message: "Password must contain at least 1 letter, 1 number and 1 special character" },
              ]}
            >

              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Confirm password does not match with password!'));
                  },
                }),
              ]}
            >

              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />

            </Form.Item>


            <Form.Item className="text-center">
              <Button
                type="primary"
                htmlType="submit"
                className="auth-form-button w-100"
                loading={!!loading}
              >
                Change Password
              </Button>

            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
