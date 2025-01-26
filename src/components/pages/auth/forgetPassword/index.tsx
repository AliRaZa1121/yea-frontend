import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { AuthService } from "../../../../services/auth.service";
import { AuthForgetPassword } from "../../../../utilities/interface/auth.interface";
import "../auth.scss";

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [timer, setTimer] = useState<number>(30); 
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); 
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        if (timer === 0) {
            setIsButtonDisabled(false);
            return;
        }

        if (isButtonDisabled) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, isButtonDisabled]);

    const handleForgetPassword = useCallback(async (values: AuthForgetPassword) => {
        setLoading(true);
        setEmail(values.email);

        try {
            const { data } = await AuthService.forgetPassword(values);
            if (data) {
                setSuccess(true);
                setIsButtonDisabled(true);
                setTimer(30); 
                message.success("Password reset link has been sent to your email.");
            }
        } catch (error) {
            console.error("Forget Password error: ", error);
            message.error("Failed to send password reset link.");
        } finally {
            setLoading(false);
        }
    }, []);


    const resendPasswordResetLink = useCallback(async () => {
        if (isButtonDisabled) return; 

        setLoading(true);

        try {
            const { data } = await AuthService.resendLink({ email });
            if (data) {
                message.success("Password reset link has been sent to your email.");
                setTimer(30); 
                setIsButtonDisabled(true);
            }
        } catch (error) {
            console.error("Resend Link error: ", error);
            message.error("Failed to send password reset link.");
        } finally {
            setLoading(false);
        }
    }, [email, isButtonDisabled]);

    return (
        <section className="auth-screen d-flex justify-content-center align-items-center">
            <div className="overlay d-flex justify-content-center align-items-center">
                <div className="light auth-screen__wrapper d-flex flex-column justify-content-center align-items-center">
                    {success ? (
                        <div className="auth-success-message">
                            <p>Password reset link sent to your email.</p>
                            <Form.Item className="text-center">
                                <Button
                                    type="primary"
                                    onClick={resendPasswordResetLink}
                                    className="auth-form-button w-100"
                                    loading={loading}
                                    disabled={isButtonDisabled}
                                >
                                    {timer > 0 ? `Send Again in ${timer}s` : "Send Again"}
                                </Button>
                            </Form.Item>
                        </div>
                    ) : (
                        <Form
                            name="normal_login"
                            className="auth-form"
                            initialValues={{ remember: true }}
                            onFinish={handleForgetPassword}
                        >
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
                            <Form.Item className="text-center">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="auth-form-button w-100"
                                    loading={loading}
                                >
                                    Request Password Reset
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ForgetPassword;
