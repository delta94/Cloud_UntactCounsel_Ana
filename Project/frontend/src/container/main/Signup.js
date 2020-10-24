import React, { Component } from "react";

import Config from "_variables";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pwd: "",
    };
    this.handleChange = (event) =>
      this.setState({ [event.target.name]: event.target.value });

    this.handleSubmit = async () => {
      let bodyData = {
        username: this.state.id,
        password: this.state.pwd,
      };
      let response = await fetch(Config.API_URL + "/signup", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: Object.keys(bodyData)
          .map(
            (key) =>
              encodeURIComponent(key) + "=" + encodeURIComponent(bodyData[key])
          )
          .join("&"),
      });
      let { statusCode, token, rank } = await response.json();
      if (statusCode === 200) {
        this.props.tokenChanger(token, rank);
      } else {
        console.log(token);
      }
    };
  }

  render() {
    let { state, handleChange } = this;
    return (
      <div className="login">
        회원가입:
        <input type="text" name="id" value={state.id} onChange={handleChange} />
        <input
          type="password"
          name="pwd"
          value={state.pwd}
          onChange={handleChange}
        />
        <button onClick={this.handleSubmit}>hello </button>
      </div>
    );
  }
}

export default Signup;
