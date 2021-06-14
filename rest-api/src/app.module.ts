import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGO_URI } from "./courses/constants";
import { CoursesModule } from "./courses/courses.module";

@Module({
    imports: [
        MongooseModule.forRoot(MONGO_URI),
        CoursesModule,
    ]
})

export class AppModule { }