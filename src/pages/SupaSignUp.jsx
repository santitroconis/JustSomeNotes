import { supabase } from "../lib/supabase";
import Input from "../components/Input";
import "../styles/signup.css";

export default function Signup() {
  const submit = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "juantroconisf@gmail.com",
      password: "password",
    });

    console.log(data, error);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <div className="Sign_up">
      <div className="signup_wrapper">
        <div className="signup_header">JUST SOME NOTES</div>
        <div className="signup_content">
          <div>
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
            <button className="button" onClick={submit}>
              Sign Up
            </button>

            <button onClick={logout}>Log out</button>
          </div>
          <div className="text_container">
            <h6 className="text">
              Already have an account?{" "}
              <a className="login_link" href="/supa/login">
                Log In
              </a>{" "}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
