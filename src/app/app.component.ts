import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { DataService } from './data.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  total: number;
  pageNumber = 1;
  pagesize = 10;
  data: any = [];

  options = new BehaviorSubject<any>([]);
  options$: Observable<any>;
  form: FormGroup;
  isProcess: boolean;

  constructor(private _dataService: DataService, private _formBuilder: FormBuilder) {

    this.options$ = this.options.asObservable().pipe(
      scan((acc, curr) => {
        return [...acc, ...curr];
      }, [])
    );
  }

  ngOnInit() {
    this.createForm();
    this.getNextBatch();


  }

  createForm() {
    this.form = this._formBuilder.group({
      pageNumber: [1],
      pageSize: [10]
    });
  }

  getNextBatch() {
    if (!this.isProcess) {
      this.isProcess = true;
      console.log('fired');
      this.form.controls['pageNumber'].setValue(this.pageNumber);
      this.form.controls['pageSize'].setValue(this.pagesize);
      this._dataService.getData(this.form.value).subscribe(res => {
        this.options.next(res.movies);
        this.total = res.totalMovie;
        this.pageNumber++;
        this.isProcess = false
      }, error => {
        console.log(error);
      });
    }
  }
}
