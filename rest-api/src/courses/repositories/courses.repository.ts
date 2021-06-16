import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course } from "../../../../shared/course";
import { CourseDoc } from "../models/course";

@Injectable()
export class CoursesRepository {

    constructor(@InjectModel('Course') private courseModel: Model<CourseDoc>) { }

    async addCourse(course: Partial<CourseDoc>): Promise<CourseDoc> {
        const newCourse = new this.courseModel(course);

        return newCourse.save();
    }

    async findAll(): Promise<CourseDoc[]> {
        return this.courseModel.find();
    }

    async updateCourse(courseId: string, changes: Partial<Course>): Promise<CourseDoc> {
        return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, { new: true });
    }

    async deleteCourse(courseId: string) {
        return this.courseModel.deleteOne({ _id: courseId });
    }
}