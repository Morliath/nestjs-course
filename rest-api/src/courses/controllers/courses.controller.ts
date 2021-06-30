import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseFilters } from "@nestjs/common";
import { Course } from "../../../../shared/course";
import { CourseDoc } from "../models/course";
import { CoursesRepository } from "../repositories/courses.repository";

@Controller("/courses")
export class CoursesController {

    constructor(private coursesRepository: CoursesRepository) { }

    @Post()
    async createCourse(@Body() course: CourseDoc): Promise<CourseDoc> {
        return this.coursesRepository.addCourse(course);
    }

    @Get()
    async findAllCourses(): Promise<CourseDoc[]> {
        return this.coursesRepository.findAll();
    }

    @Get(':courseUrl')
    async findCourseByUrl(@Param("courseUrl") courseUrl: string): Promise<CourseDoc> {
        const course = await this.coursesRepository.findCourseByUrl(courseUrl);

        if (!course) {
            throw new NotFoundException(`Could not found course for given url: ${courseUrl}`);
        }

        return course;
    }

    @Put('/:courseId')
    @UseFilters()
    async updateCourse(
        @Param("courseId") courseId: string,
        @Body("seqNo", ParseIntPipe) seqNo: number,
        @Body() changes: Partial<Course>): Promise<CourseDoc> {

        if (changes._id) {
            throw new BadRequestException("Update course id not allowed");
        }

        return this.coursesRepository.updateCourse(courseId, changes);
    }

    @Delete('/:courseId')
    async deleteCourse(@Param("courseId") courseId: string) {
        return this.coursesRepository.deleteCourse(courseId);
    }
}