import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RolesUser, Users } from '@prisma/client';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { CreateUserService } from '../services/CreateUser.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { UpdateUserService } from '../services/UpdateUser.service';
import { GetInfoUserService } from '../services/GetInfoUser.service';
import { SoftDeleteUserService } from '../services/SoftDeleteUser.service';
import { SoftDeleteUserDTO } from '../dtos/SoftDeleteUserDTO';
import { ResetPasswordDTO } from '../dtos/ResetPasswordDTO';
import { ResetPasswordService } from '../services/ResetPassword.service';
import { Roles } from '../../../shared/roles/users-roles';
import { UserDecorator } from '../../../shared/decorator/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(
    private createUserService: CreateUserService,
    private updateUserService: UpdateUserService,
    private getUserInfoService: GetInfoUserService,
    private softDeleteUserService: SoftDeleteUserService,
    private resetPasswordService: ResetPasswordService,
  ) {}

  @ApiOkResponse({ status: 201, description: 'The user has been created' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user has not created',
  })
  @Post()
  async createUser(
    @Body()
    {
      name,
      email,
      password,
      cellphone,
      height,
      weight,
      city,
      neighborhoud,
      number,
      street,
      lat,
      lng,
      zip_code,
    }: CreateUserDTO,
  ): Promise<Users> {
    return await this.createUserService.execute({
      name,
      email,
      password,
      cellphone,
      height,
      weight,
      lat,
      lng,
      city,
      neighborhoud,
      number,
      street,
      zip_code,
    });
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'The user has been loaded, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be loaded, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Get()
  @Roles(RolesUser.USER)
  async getUserInfo(@UserDecorator() user: Users): Promise<Users | undefined> {
    return await this.getUserInfoService.execute({ user_id: user.id });
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'The user has been updated, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be update, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Roles(RolesUser.USER)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @Put()
  async updateUser(
    @Body() { ...rest }: UpdateUserDTO,
    @UserDecorator() user: Users,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ): Promise<any> {
    Object.assign(rest, { image });
    return await this.updateUserService.execute({ ...rest }, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    description: 'The user has been inactivated, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be inactivated, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Roles(RolesUser.USER)
  @Patch()
  async softDeleteUser(@Body() { email }: SoftDeleteUserDTO): Promise<any> {
    return await this.softDeleteUserService.execute({ email });
  }

  @ApiOkResponse({
    status: 200,
    description: 'The user can be reset your password, success',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The user can not be reset password, failed',
  })
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'The user has not been authorized',
  })
  @Roles(RolesUser.USER)
  @Patch('/reset-password')
  async resetPassword(
    @Body() { email, new_password }: ResetPasswordDTO,
  ): Promise<Users> {
    return await this.resetPasswordService.execute({ email, new_password });
  }
}
