import { useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./slice";

function LoginComponent() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const reduxAction = useDispatch();

  const init = {
    username: "",
    password: ""
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        return { ...state, [action.field]: action.val };
      case "reset":
        return init;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);

  const validateForm = () => {
    if (info.username.trim() === "") {
      setError("Username is required");
      return false;
    }
    if (info.password.trim() === "") {
      setError("Password is required");
      return false;
    }
    setError("");
    return true;
  };

  const sendData = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const reqOption = {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(info)
    };

    fetch("https://localhost:7028/api/UserManagement/CheckLogin", reqOption)
      .then(resp => {
        if (resp.ok) {
          return resp.text();
        } else {
          throw new Error("Server Error");
        }
      })
      .then(text => text.length ? JSON.parse(text) : {})
      .then(obj => {
        if (Object.keys(obj).length === 0) {
          setMsg("Wrong Username and Password");
        } else {
          if (obj.username.status === 1) {
            // User status is approved, proceed with login
            reduxAction(login());
            localStorage.setItem("loggedUser", JSON.stringify(obj));
            
            if (obj.username.rid === 1) {
              navigate("/Admin_home");
            } else if (obj.username.rid === 2) {
              navigate("/Teacher_home");
            } else if (obj.username.rid === 3) {
              navigate("/Parent_home");
            }
          } else {
            // User status is not approved
            alert("Request has not been approved");
          }
        }
      })
      .catch(err => setError("Login Failed. Try Again" || err.toString()));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="uid" className="form-label">Username: </label>
          <input
            type='text'
            className="form-control"
            id="uid"
            name='uid'
            value={info.username}
            onChange={(e) => { dispatch({ type: 'update', field: 'username', val: e.target.value }) }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">Password: </label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            name='pwd'
            id="pwd"
            value={info.password}
            onChange={(e) => { dispatch({ type: 'update', field: 'password', val: e.target.value }) }}
          /><input
              className="form-check-input"
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={toggleShowPassword}
            /><span className="form-check-label" htmlFor="show-password">Show Password</span>
          </div>
        

        <button type='submit' className="btn btn-primary btn-spacing " onClick={sendData}>Login</button>
        <button type='reset' className="btn btn-secondary " onClick={() => { dispatch({ type: 'reset' }) }}>Clear</button>
      </form>

      <p>{msg}</p>
      <p>{error}</p>
    </div>
  );
}

export default LoginComponent;