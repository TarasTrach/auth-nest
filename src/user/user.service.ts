import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: { email: createUserDto.email },
        });
        if (existingUser) throw new ConflictException('This email already registered');
        const { password, ...user } = createUserDto;
        const hashedPassword = await hash(password);
        return this.prisma.users.create({
            data: {
                password: hashedPassword,
                ...user,
            },
        });
    }

    async findByEmail(email: string) {
        return this.prisma.users.findUnique({ where: { email: email } });
    }

    async findById(userId: number) {
        return this.prisma.users.findUnique({ where: { id: userId } });
    }
}
