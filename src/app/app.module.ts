import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '@/database/prisma.module';
import { UserModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { XxxModule } from '@/modules/xxx/xxx.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, XxxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
