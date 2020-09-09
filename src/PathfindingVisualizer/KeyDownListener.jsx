import { Component } from "react";

export default class KeyDownListener extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.props.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.props.onKeyDown);
  }
  render() {
    return null;
  }
}
