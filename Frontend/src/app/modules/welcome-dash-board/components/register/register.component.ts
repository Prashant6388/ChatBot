import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AppLoaderService } from 'src/app/shared/services/app-loader.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatomoService } from 'src/app/shared/services/matomo.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { TopbarService } from 'src/app/shared/services/topbar.service';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('form') form: any;
  public showPassword: boolean = false;
  public showPasswordConfirm: boolean = false;

  public itemForm: UntypedFormGroup;
  public hasError: boolean = false;
  public errors: any = {};
  constructor(
    private router: Router,
    private topbarService:TopbarService , 
    private matomoService : MatomoService,
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private appLoader: AppLoaderService) {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/home');
      
    }
    this.matomoService.trackPageView();
  }

  ngOnInit(): void {
    this.topbarService.hide();
    this.matomoService.setUserIdByEmail('token');
    this.buildForm();
  }
  
  private buildForm() {
  
    const password = new UntypedFormControl('', [
      Validators.required,
      //ValidationService.passwordValidator,
    ]);

    const confirmPassword = new UntypedFormControl('', [
      Validators.required,
      ValidationService.equalTo(password),
    ]);

    this.itemForm = new UntypedFormGroup({
    
      email: new UntypedFormControl('', [
        Validators.required,
        //ValidationService.emailValidator,
      ]),
      password: password,
      confirmPassword: confirmPassword,
    });
  }

  async onSubmit() {
    this.hasError = false;

    if (this.itemForm.invalid) {
      this.hasError = true;
      this.errors = ValidationService.getValidationErrors(this.itemForm);
      return;
    }

    const { email, password } = this.itemForm.value;

    const newUser: any = {
      email,
      password,
    };

    this.appLoader.open();

    await firstValueFrom(this.authService.register(newUser))
      .then((res: any) => {
        this.router.navigateByUrl('/home');
        this.topbarService.display()

      })
      .catch((e) => {
        this.snackbarService.show(e.error.message, 'danger');
      });

    this.appLoader.close();
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordConfirmVisibility(): void {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }
}
