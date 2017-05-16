import { Component, OnInit } from '@angular/core';
import {CourseService} from '../course.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../course.model';
import {NgUploaderOptions} from 'ngx-uploader';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
  id: string;
  course = new Course();
  courseForm: FormGroup;


  SEMESTER = [
    { 'value' : 0, 'name' : '1학기' },
    { 'value' : 1, 'name' : '여름 계절학기' },
    { 'value' : 2, 'name' : '2학기' },
    { 'value' : 3, 'name' : '겨울 계절학기' },
  ];

  // public fileUploaderOptions: NgUploaderOptions = {
  //   url: '',
  // };

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.route.parent.params.subscribe(params => {
      this.id = params['id'];
      this.courseService.getCourse(this.id).subscribe(
        (data) => {
          this.course = data;
          this.initForm();
        },
        (err) => {
          console.log(err);
          this.course = null;
        }
      );
    });
  }

  initForm() {
    this.courseForm = new FormGroup({
      'title': new FormControl(this.course['title'], Validators.required),
      'attachments_current': new FormControl(this.course['attachments']),
      'content': new FormControl(this.course['content'], Validators.required),
      'year': new FormControl(this.course['year'], Validators.required),
      'semester': new FormControl(this.course['semester'], Validators.required),
    });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    // if (authenticated && exists) {
    this.courseService.updateCourse(this.id, this.courseForm.value, this.course.attachments).subscribe(
      data => {
        this.onCancel();
      },
      err => {
        console.log(err);
      }
    );
    // } else if (authenticated && doesnotexist) {
    //   this.recipeService.addRecipe(this.recipeForm.value);
    // } else {
    //   return false;
    // }
  }

  // fileChange(event) {
  //   let fileList: FileList = event.target.files;
  //   if(fileList.length > 0) {
  //     let file: File = fileList[0];
  //     let formData:FormData = new FormData();
  //     formData.append('uploadFile', file, file.name);
  //     let headers = new Headers();
  //     headers.append('Content-Type', 'multipart/form-data');
  //     headers.append('Accept', 'application/json');
  //     let options = new RequestOptions({ headers: headers });
  //     this.http.post(`${this.apiEndPoint}`, formData, options)
  //       .map(res => res.json())
  //       .catch(error => Observable.throw(error))
  //       .subscribe(
  //         data => console.log('success'),
  //         error => console.log(error)
  //       )
  //   }
  // }

  fileChange(fileInput: any){
    this.course.attachments = fileInput.target.files[0];
  }
}
