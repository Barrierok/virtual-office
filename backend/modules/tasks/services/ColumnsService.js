import repositories from '../repositories';

const createResult = (column) => ({
  data: {
    type: 'columns',
    id: column.id,
    attributes: column,
  },
});

export default class ColumnsService {
  constructor() {
    this.columnsRepository = new repositories.ColumnsRepository();
  }

  async getColumns() {
    const columns = await this.columnsRepository.getColumns();
    return columns;
  }

  async insertColumn(data) {
    const insertedColumn = await this.columnsRepository.insertColumn(data);
    return createResult(insertedColumn);
  }

  async updateColumn(id, newData) {
    const updatedColumn = await this.columnsRepository.updateColumn(
      id,
      newData
    );
    return createResult(updatedColumn);
  }

  async deleteColumn(id) {
    const deletedColumn = await this.columnsRepository.deleteColumn(id);
    return createResult(deletedColumn);
  }
}
