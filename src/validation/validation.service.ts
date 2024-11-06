import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
@Injectable()
export class ValidationService {
  constructor() {}

  async handleDBrrors(error: any) {
    if (error.errno === 1062) {
      throw new BadRequestException(error.sqlMessage);
      console.log(error);
      throw new InternalServerErrorException('Please check server error');
    }
  }
}
