import React, {useState} from 'react';
import {TextButton} from "../../Common/TextButton/TextButton";
import classNames from 'classnames';
import {ISize} from "../../../interfaces/ISize";
import {ImageButton} from "../../Common/ImageButton/ImageButton";
import {Tooltip} from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import TextInput from "../../Common/TextInput/TextInput"
import "./LoginView.scss"

const LoginView: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const tryLogin = () => {

    };



  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit() {
    
    let success = false;
    console.log(email)
    console.log(password)
    if (success) {
        setLoggedIn(true);
    }
    else {
        setLoggedIn(false);
    }
  }

  return (
    <div className="Login">

          <TextInput
            key="login_email"
            label="Email"
            isPassword={false}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextInput
            key="login_password"
            label="Password"
            isPassword={true}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        <div className="LoginButtons">
            <TextButton
                    label={"Login"}
                    isDisabled={!validateForm()}
                    onClick={handleSubmit}
            />
        </div>
    </div>
  );
};

export default LoginView;