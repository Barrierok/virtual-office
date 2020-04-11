import React, { useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { createSelector } from '@reduxjs/toolkit';
import ChannelForm from './ChannelForm';
import { setActiveChannel } from './channelsSlice';
import { showModal } from '../modal/modalSlice';
import ModalRoot from '../modal/ModalRoot';
import { removeChannelType, renameChannelType } from '../../utils/constants';
import useActions from '../../utils/useActions';

const getChannels = (({ channels }) => channels.channels);
const getCurrentChannel = (({ channels }) => channels.activeChannel);

const getData = createSelector(
  [getChannels, getCurrentChannel],
  (channels, currentChannel) => ({ channels, currentChannel }),
);

const Channels = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [dispatchSetActiveChannel, dispatchShowModal] = useActions([setActiveChannel, showModal]);
  const { channels, currentChannel } = useSelector(getData);

  const toggleForm = () => setIsOpenForm(!isOpenForm);

  const handleSetActiveChannel = (activeChannel) => (e) => {
    e.preventDefault();
    dispatchSetActiveChannel({ activeChannel });
  };

  const handleRemove = (id) => () => (
    dispatchShowModal({ modalType: removeChannelType, modalProps: { id } })
  );

  const handleRename = (id, text) => () => (
    dispatchShowModal(
      { modalType: renameChannelType, modalProps: { id, initialValues: { text } } },
    )
  );

  return (
    <div className="h-100">
      <div className="d-flex justify-content-around border-bottom align-items-center">
        <span>Каналы</span>
        {!isOpenForm && <Button onClick={toggleForm} variant="wigth"><span>+</span></Button>}
        {isOpenForm && <Button onClick={toggleForm} variant="wigth"><span>&times;</span></Button>}
      </div>
      <Nav defaultActiveKey="/general" className="flex-column channels" navbar>
        {channels.map(({ id, name, removable }) => (
          <Nav.Item key={id} className="channel d-flex">
            <Nav.Link onClick={handleSetActiveChannel(id)} disabled={currentChannel === id}>
              {name}
            </Nav.Link>
            <Button variant="wigth" onClick={handleRename(id, name)}>
              <span>&#9998;</span>
            </Button>
            {removable && (
            <Button variant="wigth" onClick={handleRemove(id)}>
              <span>&times;</span>
            </Button>
            )}
          </Nav.Item>
        ))}
        {isOpenForm && <ChannelForm closeForm={toggleForm} />}
        <ModalRoot />
      </Nav>
    </div>
  );
};

export default Channels;
