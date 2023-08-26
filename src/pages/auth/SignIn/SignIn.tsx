import React, { FormEvent, ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

type UserLogin = {
  username: string;
  password: string;
};

const SignIn: React.FC = (props: Props): JSX.Element => {
  const [values, setValues] = useState<UserLogin>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="auth-container_form"
      action=""
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className="brand">
        {/* <img src={Logo} alt="logo" /> */}
        <h1>snappy</h1>
      </div>
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={(e) => handleChange(e)}
        min="3"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={(e) => handleChange(e)}
      />
      <button type="submit">Sign In</button>
      <span>
        Don't have an account ? <Link to="/auth/sign-up">Create One.</Link>
      </span>
    </form>
  );
};

export default SignIn;
