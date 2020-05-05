/* eslint-disable react/no-danger */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import { Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/ru';

import useActions from '../../utils/useActions';
import SearchBar from './SearchBar';
import { removeFeedType, updateFeedType } from '../../utils/constants';
import { showModal } from '../modal/modalSlice';
import { getActiveCollection, getFeeds, getMainId } from '../../app/selectors';

const Newsline = () => {
  const [searchValue, setSearchValue] = useState('');

  const getFilteredFeeds = createSelector(
    [getFeeds, getMainId, getActiveCollection],
    (feeds, mainId, activeCollection) => ((mainId === activeCollection) ? feeds
      .filter((f) => f.body.toLowerCase().includes(searchValue)
        || f.title.toLowerCase().includes(searchValue)) : feeds
      .filter((f) => f.collectionId === activeCollection)
      .filter((f) => f.body.toLowerCase().includes(searchValue)
        || f.title.toLowerCase().includes(searchValue))),
  );

  const feeds = useSelector(getFilteredFeeds);
  const activeCollectionId = useSelector(getActiveCollection);
  const [dispatchShowModal] = useActions(
    [showModal],
  );

  const handleRemove = (collectionId, id) => () => (
    dispatchShowModal({ modalType: removeFeedType, modalProps: { collectionId, id } })
  );

  const handleUpdate = (collectionId, id, title, body) => () => (
    dispatchShowModal(
      {
        modalType: updateFeedType,
        modalProps: { collectionId, id, initialValues: { title, body } },
      },
    )
  );

  return (
    <div className="w-50">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <section className="fields w-100 mt-5 rounded">
        {feeds.map((fd) => {
          const date = moment(fd.createdAt).calendar();
          const createTitleMarkup = () => ({ __html: fd.title });
          const createBodyMarkup = () => ({ __html: fd.body });

          return (
            <div className="feed d-block rounded" key={fd.id}>
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <h2>
                  <div dangerouslySetInnerHTML={createTitleMarkup()} className="ml-2" />
                </h2>
                <div className="d-flex">
                  <Button variant="wigth" onClick={handleRemove(activeCollectionId, fd.id)}>
                    <span>&times;</span>
                  </Button>
                  <Button variant="wigth" onClick={handleUpdate(activeCollectionId, fd.id, fd.title, fd.body)}>
                    <span>&#9998;</span>
                  </Button>
                </div>
              </div>
              <div dangerouslySetInnerHTML={createBodyMarkup()} className="ml-2 mr-2 mt-3" />
              <div className="d-flex justify-content-between mt-5 ml-2">
                <small><i>{ fd.author }</i></small>
                <small className="mr-2">{ date }</small>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Newsline;
