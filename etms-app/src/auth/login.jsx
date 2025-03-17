import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");      
    const navigate = useNavigate();

    const processLogin = async (event) => {
        event.preventDefault();
        let loginApi = "http://localhost:5000/api/auth/login";
        console.log(`Inside processLogin.... with ${username} & ${password}`);

        try {
            const response = await axios.post(loginApi, {
                username: username,
                password: password
            });

            console.log(response);
            let role = response.data.role;
            localStorage.setItem("token", response.data.token);

            switch (role) {
                case "ROLE_ADMIN":
                    navigate("/admin/dashboard");
                    break;
                case "ROLE_EMPLOYEE":
                    navigate("/employee/dashboard");
                    break;
                default:
                    break;
            }
        } catch (error) {
            setMsg("Invalid Credentials");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-card-header">ETMS Login</div>
                <div className="login-card-body">
                    {msg && <div className="login-alert">{msg}</div>}
                    <form onSubmit={processLogin}>
                        <div className="mt-2">
                            <label className="login-label">Username:</label>
                            <input
                                type="text"
                                className="login-form-control"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="login-label">Password:</label>
                            <input
                                type="password"
                                className="login-form-control"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <input
                                type="submit"
                                value="Login"
                                className="login-btn-primary"
                                disabled={!username || !password}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
