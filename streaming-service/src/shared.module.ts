import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";


@Module({
    imports: [ConfigModule.forRoot({envFilePath:".dev.env"}),JwtModule.register({secret:process.env.JWT_SECRET})],
    exports:[ConfigModule]
  })
  export class SharedModule {}