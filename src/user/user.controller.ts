import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    }

    @Patch(':id')
    update(@Param('id') id: string) {
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    }
}
