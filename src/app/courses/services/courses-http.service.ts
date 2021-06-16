import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {compareCourses, Course} from '../../../../shared/course';
import {map} from "rxjs/operators";
import {Lesson} from "../../../../shared/lesson";

const BACK_END_URL = '/api/v1/courses/' ;

@Injectable()
export class CoursesHttpService {

    constructor(private http:HttpClient) {

    }

    findAllCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(BACK_END_URL)
          .pipe(
            map(courses => courses.sort(compareCourses))
          );
    }

    findCourseByUrl(courseUrl: string): Observable<Course> {
      return this.http.get<Course>(`${BACK_END_URL}${courseUrl}`);
    }

    findLessons(
        courseId:string,
        pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

        return this.http.get<Lesson[]>('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId)
                .set('sortOrder', 'asc')
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        });
    }


    updateCourse(courseId: string, changes: Partial<Course>) {
        return this.http.put(BACK_END_URL + courseId, changes);
    }


  deleteCourse(courseId: string) {
      return this.http.delete(BACK_END_URL + courseId);
  }

  createCourse(changes: Partial<Course>) {
      return this.http.post(BACK_END_URL, changes);
  }
}
