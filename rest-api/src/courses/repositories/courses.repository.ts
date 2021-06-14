import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CourseDoc } from "../models/course";

@Injectable()
export class CoursesRepository {

    constructor(@InjectModel('Course') private courseModel: Model<CourseDoc>) {
        console.log("Course repository build");

    }

    async findAll(): Promise<CourseDoc[]> {
        return this.courseModel.find();
    }
}