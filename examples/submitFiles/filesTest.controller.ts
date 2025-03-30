import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ParseFilePipeBuilder,
  UploadedFile,
  InternalServerErrorException,
  Response,
} from '@nestjs/common';
import { ApiConsumes, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  MAX_SIZE_FILE,
} from 'src/constants/constants';
import { bytesToMB } from 'src/utils/utils';
import { unlinkSync } from 'fs';

@ApiTags('FilesTest')
@ApiBearerAuth()
@Controller('filesTest')
export class FilesTestController {
  constructor(private readonly service: FilesTestController) {}

  /*
  
  Este endpoint permite subir un archivo y pasar la validación de la entidad FilesTest.

  Este ya contiene un interceptor que se encarga de subir el archivo al servidor.
  Al entrar la función puedes administrar el archivo que se subió y los datos que se enviaron en el body.

  */
  @UseInterceptors(FileInterceptor('file'))
  @Post('submitFile')
  @ApiConsumes('multipart/form-data')
  async uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      if (file.size > MAX_SIZE_FILE) {
        throw new InternalServerErrorException(
          `La imágen excede el tamaño máximo permitido de ${bytesToMB(MAX_SIZE_FILE)} mb`,
          {
            description: `El tamaño máximo permitido es de ${bytesToMB(MAX_SIZE_FILE)} mb`,
          },
        );
      }

      return file;
    } catch (e) {
      // Remove the file if an error occurs
      unlinkSync(file.path);
      throw new InternalServerErrorException('Error al subir el archivo', {
        description: e.message,
      });
    }
  }

  @Get('getFile/:fileName')
  async getFile(@Param('fileName') fileName: string, @Response() res) {
    return this.service.getFile(fileName, res);
  }
}
