import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Form from "../components/Form";
import Input from "../components/Input";
import "../styles/login.css";

async function loginUser(event, navigate) {
  event.preventDefault();
  const data = new FormData(event.target);
  const username = data.get("username");
  const password = data.get("password");

  const errorMessageDiv = document.querySelector(".error_message");

  const { data: users, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username);

  if (error) {
    errorMessageDiv.textContent = `Error: ${error.message}`;
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
    return;
  }

  if (users.length === 0) {
    errorMessageDiv.textContent = "Invalid username or password";
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
    return;
  }

  if (users.length > 1) {
    errorMessageDiv.textContent =
      "Multiple users found with the same username. Please contact support.";
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
    return;
  }

  const user = users[0];

  if (user.password === password) {
    // Create a user object
    const userObject = {
      username: user.username,
      email: user.email,
    };

    // Store the user object in local storage
    localStorage.setItem("user", JSON.stringify(userObject));

    errorMessageDiv.textContent = "User logged in successfully";
    errorMessageDiv.classList.add("success");
    errorMessageDiv.classList.remove("error");
    errorMessageDiv.style.display = "block";
    navigate("/dashboard");
  } else {
    errorMessageDiv.textContent = "Invalid username or password";
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
  }
}

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <div className="login_wrapper">
        <div className="login_header">JUST SOME NOTES</div>
        <div className="login_content">
          <Form onSubmit={(event) => loginUser(event, navigate)}>
            <img
              className="login_logo"
              src="/src/assets/images/JSN-logo.svg"
              alt="app_logo"
            />

            <div className="error_message" style={{ display: "none" }}></div>

            <Input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <button className="login_button" type="submit">
              Log In
            </button>
          </Form>
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
