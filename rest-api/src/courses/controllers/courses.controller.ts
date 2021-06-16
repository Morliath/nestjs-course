import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Course } from "../../../../shared/course";
import { CourseDoc } from "../models/course";
import { CoursesRepository } from "../repositories/courses.repository";

@Controller("/courses")
export class CoursesController {

    constructor(private coursesRepository: CoursesRepository) { }

    @Post()
    async createCourse(@Body() course: Partial<CourseDoc>): Promise<CourseDoc> {
        return this.coursesRepository.addCourse(course);
    }

    @Get()
    async findAllCourses(): Promise<CourseDoc[]> {
        return this.coursesRepository.findAll();
    }

    @Put('/:courseId')
    async updateCourse(
        @Param("courseId") courseId: string,
        @Body() changes: Partial<Course>): Promise<CourseDoc> {

        return this.coursesRepository.updateCourse(courseId, changes);
    }

    @Delete('/:courseId')
    async deleteCourse(@Param("courseId") courseId: string) {
        return this.coursesRepository.deleteCourse(courseId);
    }
}