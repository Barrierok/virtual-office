import React from 'react';
import { DateTime } from 'luxon';

import connect from '../../utils/connect';

const mapStateToProps = (state) => {
  const { messages: { messages }, channels: { activeChannel } } = state;
  const filteredMessages = messages.filter((m) => m.channelId === activeChannel);
  return { messages: filteredMessages };
};

@connect(mapStateToProps)
class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { messages } = this.props;
    return (
      <section className="fields">
        {messages.map((ms) => {
          const date = DateTime
            .fromISO(ms.createdAt)
            .toLocaleString(DateTime.TIME_SIMPLE);
          return (
            <div className="message d-block ml-2" key={ms.id}>
              <div>
                <strong className="mr-2">{ms.author}</strong>
                <span>{date}</span>
              </div>
              <p>{ms.text}</p>
            </div>
          );
        })}
        <div ref={this.messagesEndRef} />
      </section>
    );
  }
}

export default Chat;
