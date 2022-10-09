import { HttpException, InternalServerErrorException } from '@nestjs/common';

export default function ErrorHandling(error: HttpException | Error) {
  if (error instanceof HttpException) {
    throw error;
  } else {
    throw new InternalServerErrorException({
      status: 'Internal Server Error',
      message: error.message,
    });
  }
}
