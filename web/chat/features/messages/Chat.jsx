import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const getActiveChannel = (state) => state.channels.activeChannel;
const getMessages = (state) => state.messages.messages;

const getFilteredMessages = createSelector(
  [getMessages, getActiveChannel],
  (messages, activeChannel) => messages.filter((m) => m.channelId === activeChannel),
);

const Chat = () => {
  const lastMessageRef = useRef(null);
  const messages = useSelector(getFilteredMessages);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <section className="fields">
      {messages.map((ms) => {
        const date = moment(ms.createdAt).calendar();
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
      <div ref={lastMessageRef} />
    </section>
  );
};

export default Chat;
