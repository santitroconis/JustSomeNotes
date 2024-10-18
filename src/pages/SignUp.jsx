import Form from "../components/Form";
import Input from "../components/Input";
import "../styles/signup.css";
import { supabase } from "../lib/supabase";

async function createUser(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const userData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(userData);

  const { error } = await supabase.from("user").insert(userData);
  if (error) {
    console.error("Error creating user:", error);
  } else {
    console.log("User created successfully");
  }
}

export default function Signup() {
  return (
    <div className="Sign_up">
      <div className="signup_wrapper">
        <div className="signup_header">JUST SOME NOTES</div>
        <div className="signup_content">
          <Form onSubmit={createUser}>
            <img
              className="signup_logo"
              src="/src/assets/images/JSN-logo.svg"
              alt="app_logo"
            />
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
            <button className="button" type="submit">
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
