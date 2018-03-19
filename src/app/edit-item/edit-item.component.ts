import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ServiceComponent } from '../service/service.component';
import { ItemsInfo } from "../service/properties";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from "ng2-toastr/ng2-toastr";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  response: any;
  url: string;
  firstName: string;
  title: string;
  email: string;
  phNumber: string;
  message: string;
  error: string;

  constructor(
    private appService: ServiceComponent,
    private router: Router,
    private dynamicRoute: ActivatedRoute,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.url = "/_api/web/lists/getByTitle('SP CRUD')/items?$filter=Id eq " + "'" + this.dynamicRoute.snapshot.params['id'] + "'"
    this.appService.getselectedItem(this.url).subscribe((data: any) => {
      this.response = data.d.results;
      this.response.forEach(element => {
        this.firstName = element.First_x0020_Name;
        this.title = element.Title;
        this.email = element.Email;
        this.phNumber = element.Phone_x0020_Number;
      });
    });
    console.log(this.response);
  }

  updateslectedItem(): void {
    this.toastr.success('Item Updated Successfully!');
    this.appService.getRequestDigest().subscribe((r) => {
      if (r.length != 0) {
        console.log('res' + r.d.GetContextWebInformation.FormDigestValue);
      }
      this.url = "/_api/web/lists/getByTitle('SP CRUD')/items" + "(" + this.dynamicRoute.snapshot.params['id'] + ")"
      this.appService.updateslectedItem(this.url, {
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
           if (dataResponse == null) {
          //   this.toastr.success('Item Updated Successfully!');
            this.router.navigateByUrl('/displayItem');
          }
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

 cancle():void{
  this.router.navigateByUrl('/displayItem');
  }

  delete():void{
    this.toastr.success('Item Deleted Successfully!');
    this.appService.getRequestDigest().subscribe((r) => {
      if (r.length != 0) {
        console.log('res' + r.d.GetContextWebInformation.FormDigestValue);
      }
      this.url = "/_api/web/lists/getByTitle('SP CRUD')/items" + "(" + this.dynamicRoute.snapshot.params['id'] + ")"
      this.appService.deletelistItem(this.url, r.d.GetContextWebInformation.FormDigestValue)
        .subscribe((dataResponse) => {
          console.log('Inside else');
          console.log(dataResponse);
          this.message = 'Modified Transporter Data';
          this.error = '';
          this.toastr.success('Item Updated Successfully!');
          this.router.navigateByUrl('/displayItem');
          // if (dataResponse == null) {
          //   this.toastr.success('Item Updated Successfully!');
          //   this.router.navigateByUrl('/displayItem');
          // }
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
  
}
