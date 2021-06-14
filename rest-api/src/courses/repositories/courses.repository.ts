import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course } from "../models/course";

@Injectable()
export class CoursesRepository {

    constructor(@InjectModel('Course') private courseModel: Model<Course>) {
        console.log("Course repository build");

    }

    async findAll(): Promise<Course[]> {
        return this.courseModel.find();
    }
}