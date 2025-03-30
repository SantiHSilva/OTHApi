import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createBackups() {
    let havePgDump = false;

    // Check if pg_dump is installed
    exec('pg_dump --version', (_, stdout) => {
      if (stdout) {
        console.log('pg_dump is installed');
        havePgDump = true;
      }

      if (!havePgDump) {
        console.error('pg_dump is not installed o not in PATH');
        return;
      }

      const DB_CONNECTION = process.env.DATABASE_URL;

      const fileName = new Date().toISOString().replace(/:/g, '.');

      exec(
        `pg_dump ${DB_CONNECTION} > backups/${fileName}.sql`,
        (error, stdout, stderr) => {
          if (error) {
            this.logger.error(
              'Error creating backup, error: ' + error,
              ' stdout: ' + stdout,
              ' stderr: ' + stderr,
            );
            return;
          }
        },
      );
    });
  }
}
