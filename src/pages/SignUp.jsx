import Form from "../components/Form";
import Input from "../components/Input";
import "../styles/signup.css";

export default function Signup() {
  return (
    <div className="Sign_up">
      <div className="signup_wrapper">
        <div className="signup_header">JUST SOME NOTES</div>
        <div className="signup_content">
          <Form>
            <img
              className="signup_logo"
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
              id="email"
              type="email"
              placeholder="email"
              minLength={7}
              maxLength={25}
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
