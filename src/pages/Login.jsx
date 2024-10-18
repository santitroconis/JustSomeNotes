import Form from "../components/Form";
import "../styles/login.css";
import Input from "../components/Input";

export default function Login() {
  return (
    <div className="Login">
      <div className="login_wrapper">
        <div className="login_header">JUST SOME NOTES</div>
        <div className="login_content">
          <Form>
            <img
              className="login_logo"
              src="/src/assets/images/JSN-logo.svg"
              alt="app_logo"
            />
            <Input
              id="username"
              type="text"
              placeholder="username"
              minLength={5}
              maxLength={15}
              required
            />
            <Input
              id="password"
              type="password"
              placeholder="password"
              minLength={4}
              maxLength={20}
              required
            />
            <button className="button" type="submit">
              Register
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
