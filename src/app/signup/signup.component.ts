import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';


@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;
	firstName = new FormControl('', Validators.required);
	lastName = new FormControl('', Validators.required);
	email = new FormControl('', [Validators.required, Validators.email]);

	constructor(formBuilder: FormBuilder) {
		this.signupForm = formBuilder.group({
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email
		});

	}

	ngOnInit() {
	}

	getErrorMessage() {
		return this.email.hasError('required') ? 'Email is required' :
			this.email.hasError('email') ? 'Not a valid email' : '';
	}

	// Executed When Form Is Submitted  
	onFormSubmit(form:NgForm) {  
	  console.log(form);  
	}  

}
