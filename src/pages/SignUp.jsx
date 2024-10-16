import Form from "../components/Form";
import "../styles/signup.css";

export default function Signup() {
  return (
    <div className="Sign_up">
      <div className="signup_wrapper">
        <div className="signup_header">JUST SOME NOTES</div>
        <div className="signup_content">
          <Form>
            <div className="form_wrapper">
              <img
                className="signup_logo"
                src="/src/assets/images/JSN-logo.svg"
                alt="app_logo"
              />
              <form action="">
                <input id="username" type="text" />
                <input id="email" type="email" />
                <input id="password" type="password" name="" />
              </form>
            </div>
          </Form>
          <div className="text_container">
            <h6 className="text">
              Alredy have an account?{" "}
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
