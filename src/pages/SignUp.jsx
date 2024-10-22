import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Form from "../components/Form";
import Input from "../components/Input";
import "../styles/signup.css";

async function createUser(event, navigate) {
  event.preventDefault();
  const data = new FormData(event.target);
  const email = data.get("email");
  const password = data.get("password");
  const username = data.get("username");

  const errorMessageDiv = document.querySelector(".error_message");

  // Check if the username or email already exists
  const { data: existingUser, error: checkError } = await supabase
    .from("user")
    .select("*")
    .or(`username.eq.${username},email.eq.${email}`);

  if (checkError) {
    errorMessageDiv.textContent = `Error checking user: ${checkError.message}`;
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
    return;
  }

  if (existingUser.length > 0) {
    errorMessageDiv.textContent = "Username or email already exists";
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
    return;
  }

  const { data: newUser, error: insertError } = await supabase
    .from("user")
    .insert([{ username, email, password }]);

  if (insertError) {
    if (
      insertError.message.includes(
        "duplicate key value violates unique constraint"
      )
    ) {
      errorMessageDiv.textContent =
        "Please choose a different username or email.";
    } else {
      errorMessageDiv.textContent = `${insertError.message}`;
    }
    errorMessageDiv.classList.add("error");
    errorMessageDiv.classList.remove("success");
    errorMessageDiv.style.display = "block";
  } else {
    errorMessageDiv.textContent = "User created successfully";
    errorMessageDiv.classList.add("success");
    errorMessageDiv.classList.remove("error");
    errorMessageDiv.style.display = "block";
    navigate("/login");
  }
}

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="Sign_up">
      <div className="signup_wrapper">
        <div className="signup_header">JUST SOME NOTES</div>
        <div className="signup_content">
          <Form onSubmit={(event) => createUser(event, navigate)}>
            <img
              className="signup_logo"
              src="/src/assets/images/JSN-logo.svg"
              alt="app_logo"
            />

            <div className="error_message" style={{ display: "none" }}></div>

            <Input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              minLength={5}
              maxLength={15}
              required
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              required
            />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
            />
            <button className="signup_button" type="submit">
              Sign Up
            </button>
          </Form>
          <div className="text_container">
            <h6 className="text">
              Already have an account?{" "}
              <a className="login_link" href="/login">
                Log In
              </a>{" "}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
