import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from './modalSlice';
import { useFormik } from 'formik';
import { FaPlay, FaPause } from 'react-icons/fa';
import { fetchUsers, removeTask, updateTask } from '../../service';
import { keys, toNumber } from 'lodash';
/* eslint react/prop-types: 0 */

const UpdateTask = (props) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setUsersLoading] = useState(false);

  const { title, description, id } = props.data;

  const formik = useFormik({
    initialValues: {
      title,
      description,
      users: {},
    },
    onSubmit: async (values) => {
      const usersIds = keys(values.users).map(toNumber);
      const { id } = props.data;
      const newAttributes = {
        title: values.title,
        description: values.description,
        users: usersIds,
      };
      try {
        await updateTask(id, newAttributes);
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(hideModal());
      }
    },
  });

  const handleHideModal = () => {
    dispatch(hideModal());
  };

  const handleDelete = () => {
    removeTask(id);
  };

  useEffect(() => {
    setUsersLoading(true);
    const fetchData = async () => {
      const result = await fetchUsers();
      setUsers(result.data);
      setUsersLoading(false);
    };
    fetchData();
  }, [setUsers, setUsersLoading]);

  return (
    <Modal size="lg" show onHide={handleHideModal} className="confirm">
      <Modal.Header closeButton>
        Обновление задачи
        <span className="font-weight-bold ml-1"> {title}</span>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-around">
        <div className="add-task-form w-100">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Заголовок</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Описание</label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </div>
            </div>
            <fieldset className="form-group">
              <div className="row">
                <legend className="col-form-label col-sm-2 pt-0">
                  Назначить участников
                </legend>
                <div className="col-sm-10">
                  {isUsersLoading && <span>Загрузка пользователей...</span>}
                  {users.map((u, i) => {
                    const { username, id } = u;
                    return (
                      <div className="form-check" key={`user-${id}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`user-${i}`}
                          name={`users[${id}]`}
                          onChange={formik.handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`user-${i}`}
                        >
                          {username}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="row mt-4">
                <legend className="col-form-label col-sm-2">Таймер</legend>
                <div className="col-4">
                  <input type="text" value="00:00" className="form-control" />
                </div>
                <div className="col-4 d-flex my-auto">
                  <FaPlay fill={'#0e9905'} />
                  <div className="ml-2" />
                  <FaPause fill={'#a5410a'} />
                </div>
              </div>
            </fieldset>
            <div className="form-group row justify-content-between">
              <div className="ml-2">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Удалить
                </button>
              </div>
              <div>
                <button className="btn btn-secondary" onClick={handleHideModal}>
                  Отменить
                </button>
                <button
                  type="submit"
                  className="btn btn-primary mx-2"
                  disabled={formik.isSubmitting}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTask;
