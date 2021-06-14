import { Controller, Get } from "@nestjs/common";
import { Course } from "../../../../shared/course"
import { CoursesRepository } from "../repositories/courses.repository";

@Controller("/api/v1")
export class CoursesController {

    constructor(private coursesRepository: CoursesRepository) {
        console.log("Courses controller build");
        console.log(this.coursesRepository);
    }

    @Get('/courses')
    async findAllCourses(): Promise<Course[]> {

        return this.coursesRepository.findAll();
    }
}