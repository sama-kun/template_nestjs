import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/database/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    JwtModule,
    PrismaModule,
  ],
  exports: [UserService],
})
export class UserModule {}
