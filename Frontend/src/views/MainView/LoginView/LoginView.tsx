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
import axios from 'axios';

interface IProps {
  notifyLogin: (username: string) => any;
}

const LoginView: React.FC<IProps> = ({notifyLogin}) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit() {

    var endpoint : string = 'https://jsonplaceholder.typicode.com/users'; 
    axios.get(endpoint)
      .then(res => {
        setLoggedIn(res.data);
    }).catch(e => console.error(e))

    if (email === "shoaib" || email === "rehman" || email === "zubair") {
      notifyLogin(email)
    }
    
    if (loggedIn) {

    }
    else {
      
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