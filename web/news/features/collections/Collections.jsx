import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { Nav, Button, Container } from 'react-bootstrap';

import useActions from '../../utils/useActions';
import CollectionForm from './collectionForm';
import ModalRoot from '../modal/ModalRoot';

import { setActiveCollection } from './collectionsSlice';
import { showModal } from '../modal/modalSlice';

import { removeCollectionType, renameCollectionType } from '../../utils/constants';

import { getCollections, getActiveCollection } from '../../app/selectors';

const getData = createSelector(
  [getCollections, getActiveCollection],
  (collections, activeCollection) => ({ collections, activeCollection }),
);

const Collections = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [dispatchSetActiveCollection, dispatchShowModal] = useActions(
    [setActiveCollection, showModal],
  );
  const { collections, activeCollection } = useSelector(getData);

  const toggleForm = () => setIsOpenForm(!isOpenForm);

  const handleSetActiveCollection = (activeCollection) => (e) => { /* eslint-disable-line */
    e.preventDefault();
    dispatchSetActiveCollection({ activeCollection });
  };

  const handleRemove = (id) => () => (
    dispatchShowModal({ modalType: removeCollectionType, modalProps: { id } })
  );

  const handleRename = (id, text) => () => (
    dispatchShowModal(
      { modalType: renameCollectionType, modalProps: { id, initialValues: { text } } },
    )
  );

  return (
    <div className="collections-container border rounded">
      <div className="d-flex justify-content-between border-bottom align-items-center">
        <span className="pl-2">Коллекции новостей</span>
        {!isOpenForm && <Button onClick={toggleForm} variant="wigth"><span>+</span></Button>}
        {isOpenForm && <Button onClick={toggleForm} variant="wigth"><span>&times;</span></Button>}
      </div>
      <Container fluid>
        <Nav defaultActiveKey="main" className="flex-column collections" navbar>
          {collections.map(({ id, name, removable }) => (
            <Nav.Item key={id} className="d-flex justify-content-between collection">
              <Nav.Link onClick={handleSetActiveCollection(id)} disabled={activeCollection === id}>
                {name}
              </Nav.Link>
              <div className="d-flex">
                {removable && (
                  <Button variant="wigth" onClick={handleRemove(id)}>
                    <span>&times;</span>
                  </Button>
                )}
                <Button variant="wigth" onClick={handleRename(id, name)}>
                  <span>&#9998;</span>
                </Button>
              </div>
            </Nav.Item>
          ))}
          {isOpenForm && <CollectionForm closeForm={toggleForm} />}
          <ModalRoot />
        </Nav>
      </Container>
    </div>
  );
};

export default Collections;
