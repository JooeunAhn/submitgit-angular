import {Component, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import { NgUploaderOptions } from 'ngx-uploader';
import {AppConfig} from "../../app.config";
import {Http, Headers} from "@angular/http";

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  public form: FormGroup;
  public file: any;
  public codeUrl: string = null;

  public fileUploaderOptions:NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: this.config.BASE_URL
  };

  constructor(private fb: FormBuilder, @Inject('APP_CONFIG') private config: AppConfig, private http: Http) {
    this.form = this.fb.group({
      file: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit(){
    console.log(this.file);
    let url = `${this.config.BASE_URL}api/v1/encryptor/`;
    let data = new FormData();
    data.append('code', this.file);
    // TODO 과제 pk 넣어줘야함
    data.append('assignment', "1");
    return this.http.post(url, data, {headers: new Headers({
      "Authorization": `Token ${localStorage.getItem('auth_token')}`
    })}).map(res=>res.json()).subscribe(
      (data)=>{
        this.codeUrl = data['code'];
        console.log(data);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  uploadListener(event){
    if(event.target.files[0]){
      this.file = event.target.files[0];
    }else{
      this.file = null;
    }
  }
}

// putTextbookQuestionImage(qid, file){
//   var data = new FormData();
//   data.append("image", file);
//   return this.http.put(`${this.sharedService.getHost()}api/v1/textbook_question_image/${qid}/`, data,
//     {headers: new Headers({'Authorization': "Token " + localStorage.getItem("renote_auth_token"),})}).map(res => res.json())
// }
