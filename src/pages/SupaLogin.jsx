import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Form from "../components/Form";
import Input from "../components/Input";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("juantroconisf@gmail.com"),
    [password, setPassword] = useState("password");

  const submit = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        redirectTo: "/dashboard",
      },
    });

    console.log(data, error);
  };

  return (
    <div className="Login">
      <div className="login_wrapper">
        <div className="login_header">JUST SOME NOTES</div>
        <div className="login_content">
          <div>
            <img
              className="login_logo"
              src="/src/assets/images/JSN-logo.svg"
              alt="app_logo"
            />

            <div className="error_message" style={{ display: "none" }}></div>

            <Input
              id="email"
              name="email"
              type="text"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="button" onClick={submit}>
              Log In
            </button>
          </div>
          <div className="text_container">
            <h6 className="text">
              Don't have an account?{" "}
              <a className="signup_link" href="/supa/signup">
                Sign Up
              </a>{" "}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
