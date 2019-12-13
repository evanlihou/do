import "./account.scss";
import * as React from "react";

interface IAccountState {}

interface IAccountProps {
  match: any;
}

export class Account extends React.Component<IAccountProps, IAccountState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container account">
        {/* Account editing not implemented. */}
        <h1>Account</h1>
        <p>
          This is your account. The settings here{" "}
          {/* would if it was implemented */}
          personalize the app to you.
        </p>
        <form>
          <label htmlFor="accountName">Name:</label>
          <input type="text" defaultValue="John Doe" id="accountName" />

          <label htmlFor="accountEmail">Email:</label>
          <input type="text" defaultValue="j@johndoe.me" id="accountEmail" />
        </form>
      </div>
    );
  }
}
