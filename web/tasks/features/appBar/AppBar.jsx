import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { TiDocumentText } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import AppBarFeaturesButton from './AppBarFeaturesButton';
import {
  addColumn,
  columnsSelectors,
  removeNullColumns,
} from '../columns/columnsSlice';
import { tasksSelectors } from '../tasks/tasksSlice';

const navItems = [
  {
    id: 1,
    title: 'Добавить ещё колонку',
    icon: <IoMdAdd />,
    handler: 'addNewColumn',
  },
];

const AppBar = () => {
  const dispatch = useDispatch();

  const handlersMapping = {
    addNewColumn: () => {
      dispatch(removeNullColumns());
      dispatch(addColumn({ data: null }));
    },
  };

  return (
    <div className="d-flex flex-grow-1">
      {navItems.map((i) => {
        const { id, title, icon, handler } = i;
        return (
          <AppBarFeaturesButton key={id} onClick={handlersMapping[handler]}>
            {icon}
            <span className="text-decoration-none text-white ml-2">
              {title}
            </span>
          </AppBarFeaturesButton>
        );
      })}
      <AppBarFeaturesButton>
        <TiDocumentText />
        <ReportLink />
      </AppBarFeaturesButton>
    </div>
  );
};

const ReportLink = () => {
  const tasks = useSelector(tasksSelectors.tasks);
  const columns = useSelector(columnsSelectors.columns);

  const getReportLink = () => {
    console.log(tasks);
    console.log(columns);

    const data = [
      ['name1', 'city1', 'some other info'],
      ['name2', 'city2', 'more info'],
    ];

    return JSONToCSVConvertor(data);
  };

  return (
    <a
      href={getReportLink()}
      download="report.csv"
      className="text-decoration-none text-white ml-2"
    >
      Сгенерировать отчет
    </a>
  );
};

function JSONToCSVConvertor(arrData) {
  let CSV = 'sep=,' + '\r\n\n';

  for (let i = 0; i < arrData.length; i++) {
    let row = '';

    for (let index in arrData[i]) {
      row += '"' + arrData[i][index] + '",';
    }

    row.slice(0, row.length - 1);

    CSV += row + '\r\n';
  }

  return 'data:text/csv;charset=utf-8,' + escape(CSV);
}

export default AppBar;
