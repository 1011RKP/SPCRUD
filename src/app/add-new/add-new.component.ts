import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { ServiceComponent } from "../service/service.component";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

  url: string;
  response: any;
  firstName: string;
  title: string;
  email: string;
  phNumber: string;
  message: string;
  error: string;

  constructor(
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public appService: ServiceComponent,
    private dynamicRoute: ActivatedRoute,
    public router: Router
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  showSuccess() {
    this.toastr.success('Item Updated Successfully!');
  }

  ngOnInit() {
  }

  addnewItem(): void {
    this.toastr.success('Item Added Successfully!');
    this.appService.getRequestDigest().subscribe((r) => {
      if (r.length != 0) {
        console.log('res' + r.d.GetContextWebInformation.FormDigestValue);
      }
      this.url = "/_api/web/lists/getByTitle('SP CRUD')/items"
      this.appService.addlistItem(this.url, {
        First_x0020_Name: this.firstName,
        Title: this.title,
        Email: this.email,
        Phone_x0020_Number: this.phNumber
      }, r.d.GetContextWebInformation.FormDigestValue)
        .subscribe((dataResponse) => {
          console.log('Inside else');
          console.log(dataResponse);
          this.message = 'Modified Transporter Data';
          this.error = '';
          this.router.navigateByUrl('/displayItem');
        },
          (error) => {
            this.error = 'Problem Updating Item. Please contact IT.';
            this.message = '';
          });
    },
      (error) => {
        this.error = 'Problem Getting FormDigest Value.Please contact IT.';
        this.message = '';
      });      
  }

  cancle(): void {
    this.router.navigateByUrl('/displayItem');
  }

}
