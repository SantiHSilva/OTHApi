import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UPLOAD_DIR } from 'src/constants/constants';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class FilesTestService {
  constructor(readonly prisma: PrismaService) {}

  async getFile(fileName: string, res: Response) {
    const pathToUpload = join(UPLOAD_DIR, fileName);
    console.log('pathToUpload', pathToUpload);
    try {
      res.status(200);
      return res.sendFile(pathToUpload);
    } catch (error) {
      console.log('error', error);
      res.status(404);
      return res.send(`Error al obtener el archivo ${fileName}`);
    }
  }

}
