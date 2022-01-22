import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService , NotificationService } from '../../services/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;
  formSubmitted = false;
  loading = false;
  showPassword : Boolean = false;

  constructor(private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService : NotificationService) {
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
        }
     }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(12)]],
      lastName : [''],
      userEmail : ['',[Validators.required,Validators.email]],
      userRole : ['customer'],
      userMobile : ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      userPassword : ['',[Validators.required,Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword : ['',[Validators.required,Validators.minLength(8),]]
    },{
      validator: this.MustMatch('userPassword', 'confirmPassword')
    })
  }

  MustMatch(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
        const pass = formGroup.controls[password1];
        const confirmPass = formGroup.controls[password2];
        if (confirmPass.errors && !confirmPass.errors.mustMatch) {
            return;
        }

        // set error on confirmPass if validation fails
        if (pass.value !== confirmPass.value) {
              confirmPass.setErrors({ mustMatch: true });
        } else {
              confirmPass.setErrors(null);
        }
    }
  }

  get f(){ return this.registerForm.controls; }

  register(){
    this.formSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.spinner.show();
    //   console.log(this.registerForm.value);
    //   if(this.registerForm.value.userName != "" && this.registerForm.value.userName != undefined && this.registerForm.value.userName != null){
    //   this.registerForm.value.userName = this.registerForm.value.firstName;
    //   if(this.registerForm.value.lastName != "" && this.registerForm.value.lastName != null || this.registerForm.value.lastName != undefined){
    //     this.registerForm.value.userName += " " + this.registerForm.value.lastName;
    //   }
    // }
    // delete this.registerForm.value.firstName;
    // delete this.registerForm.value.lastName; 
    // delete this.registerForm.value.confirmPassword;
    this.authService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.notificationService.showSuccess("",data.message);
                    this.router.navigate(['/auth/login']);
                    this.spinner.hide();
                },
                error => {
                  this.spinner.hide();
                });
  }
  

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
  navbarClass = "topnav";
  responsive(){
    if(this.navbarClass == "topnav"){
      this.navbarClass = "topnav responsive"
    }else{
      this.navbarClass = "topnav";
    }
  }
}
