import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_URI } from "./courses/constants";
import { CoursesModule } from "./courses/courses.module";

@Module({
    imports: [
        CoursesModule,
        MongooseModule.forRoot(MONGO_URI),
    ]
})

export class AppModule { }