import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { hideModal } from './modalSlice';
import { useFormik } from 'formik';
import { fetchUsers, postTask } from '../../service';
import { keys, toNumber } from 'lodash';

const AddTask = (props) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setUsersLoading] = useState(false);

  const { columnId } = props.data;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      users: {},
    },
    onSubmit: async (values) => {
      const usersIds = keys(values.users).map(toNumber);
      const attributes = {
        title: values.title,
        description: values.description,
        users: usersIds,
      };
      try {
        await postTask(columnId, attributes);
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
      <Modal.Header closeButton>Добавление новой задачи</Modal.Header>
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
            </fieldset>
            <div className="form-group row justify-content-end">
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
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddTask;
