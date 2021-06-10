import { Controller, Get } from "@nestjs/common";
import { findAllCourses } from "../../../db-data";
import { Course } from "../../../../shared/course"

@Controller()
export class CoursesController {

    @Get('/api/v1/courses')
    async findAllCourses(): Promise<Course[]> {

        return findAllCourses();
    }
}