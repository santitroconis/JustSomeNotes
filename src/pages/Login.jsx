import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import Form from "../components/Form";
import "../styles/login.css";

export default function Login() {
  return (
    <div className="Login">
      <div className="login_wrapper">
        <div className="login_header">JUST SOME NOTES</div>
        <div className="login_content">
          <Form />
          <div className="text_container">
            <h6 className="text">
              Don't have an account?{" "}
              <a className="signup_link" href="/signup">
                Sign Up
              </a>{" "}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
