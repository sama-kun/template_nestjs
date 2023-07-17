import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { XxxService } from './xxx.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/database/prisma.module';
// @ts-ignore
import { XxxController } from './xxx.controller';

@Module({
  controllers: [XxxController],
  providers: [XxxService],
  imports: [
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    JwtModule,
    PrismaModule,
  ],
  exports: [XxxService],
})
export class XxxModule {}
