import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const detectStatusCodesErrors = [401, 404, 405, 500];
const detectStatusCodesModify = [200, 201, 204];

const logAction = {
  error: 'error',
  modify: 'modify',
  combined: 'log',
};

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;

      const log = async (type: string) => {
        const body = await req.body;
        const headers = req.headers;
        const message = `[${req.method}] ${req.url} - ${statusCode} - ${JSON.stringify(body)} - ${JSON.stringify(headers)}`;
        switch (type) {
          case logAction.error:
            this.logger.error(message);
            break;
          case logAction.modify:
            this.logger.warn(message);
            break;
        }
      };

      if (detectStatusCodesErrors.includes(statusCode)) {
        log(logAction.error);
      }

      if (detectStatusCodesModify.includes(statusCode)) {
        log(logAction.modify);
      }
    });

    next();
  }
}
