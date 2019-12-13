import "./home.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

interface IHomeComponentState {}

const initialState: IHomeComponentState = {};

interface IHomeComponentProps {}

class HomeComponent extends React.Component<
  IHomeComponentProps,
  IHomeComponentState
> {
  static propTypes = {};

  constructor(props: IHomeComponentProps) {
    super(props);
    this.state = initialState;
  }
  render() {
    return (
      <div className="home">
        <div className="hero">
          <div className="hero-content">A to-do app you can live with</div>
        </div>

        <article>
          <h2>Why You Should Use Do.</h2>
          <p>
            Do is a simple to-do web-app that uses modern technology and doesn’t
            want your data. With an award winning user experience [citation
            needed], you’ll never want to use another task management system
            again [dubious]. Here’s what the pros have to say about it:
          </p>
          <blockquote>
            "I’m being quoted to introduce something, but I have no idea what it
            is and certainly don’t endorse it."
            <span className="attribution">Randall Munroe, xkcd</span>
          </blockquote>
          <p>
            Everything stays inside your browser and you can pick up where you
            left off later. Utilizing state-of-the-art cyber magic like React ⚛️
            and WebSQL 💾, Do. keeps track of your tasks exactly as well as you
            take care of your browser's data.
          </p>
          <div className="call-to-action">
            <Link to="/dashboard" className="button">
              Go To App
            </Link>
          </div>
        </article>
      </div>
    );
  }
}

export const Home = connect((state: any) => {
  return {};
})(HomeComponent);
