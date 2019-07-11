import React, { Component } from "react";
import "./ChatInput.scss";

class ChatInput extends Component {
  state = {};
  render() {
    return (
      <div className="ChattInput">
        <input className="hej" onKeyDown={this.props.send} />
      </div>
    );
  }
}

export default ChatInput;
