import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FOLDER_UPLOAD } from 'src/constants/constants';
import { FilesTestService } from './filesTest.service';
import { FilesTestController } from './filesTest.controller';

// create 'uploads' file to root
const uploadDir = join(process.cwd(), FOLDER_UPLOAD);

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FilesTestController],
  providers: [FilesTestService],
})
export class FilesTestModule {}
