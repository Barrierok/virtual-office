import {
  ValidationError,
  NotFoundError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} from 'objection';

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ValidationError) {
      switch (err.type) {
        case 'ModelValidation':
          ctx.status = 400;
          ctx.body = {
            message: err.message,
            type: err.type,
            data: err.data,
          };
          break;
        case 'RelationExpctxsion':
          ctx.status = 400;
          ctx.body = {
            message: err.message,
            type: 'RelationExpctxsion',
            data: {},
          };
          break;
        case 'UnallowedRelation':
          ctx.status = 400;
          ctx.body = {
            message: err.message,
            type: err.type,
            data: {},
          };
          break;
        case 'InvalidGraph':
          ctx.status = 400;
          ctx.body = {
            message: err.message,
            type: err.type,
            data: {},
          };
          break;
        default:
          ctx.status = 400;
          ctx.body = {
            message: err.message,
            type: 'UnknownValidationError',
            data: {},
          };
          break;
      }
    } else if (err instanceof NotFoundError) {
      ctx.status = 404;
      ctx.body = {
        message: err.message,
        type: 'NotFound',
        data: {},
      };
    } else if (err instanceof UniqueViolationError) {
      ctx.status = 409;
      ctx.body = {
        message: err.message,
        type: 'UniqueViolation',
        data: {
          columns: err.columns,
          table: err.table,
          constraint: err.constraint,
        },
      };
    } else if (err instanceof NotNullViolationError) {
      ctx.status = 400;
      ctx.body = {
        message: err.message,
        type: 'NotNullViolation',
        data: {
          column: err.column,
          table: err.table,
        },
      };
    } else if (err instanceof ForeignKeyViolationError) {
      ctx.status = 409;
      ctx.body = {
        message: err.message,
        type: 'ForeignKeyViolation',
        data: {
          table: err.table,
          constraint: err.constraint,
        },
      };
    } else if (err instanceof CheckViolationError) {
      ctx.status = 400;
      ctx.body = {
        message: err.message,
        type: 'CheckViolation',
        data: {
          table: err.table,
          constraint: err.constraint,
        },
      };
    } else if (err instanceof DataError) {
      ctx.status = 400;
      ctx.body = {
        message: err.message,
        type: 'InvalidData',
        data: {},
      };
    } else if (err instanceof DBError) {
      ctx.status = 500;
      ctx.body = {
        message: err.message,
        type: 'UnknownDatabaseError',
        data: {},
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: err.message,
        type: 'UnknownError',
        data: {},
      };
    }
  }
};
