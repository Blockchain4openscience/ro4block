import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
	MatCardModule, 
	MatIconModule, 
	MatAutocompleteModule,
	MatButtonModule, 
	MatInputModule
} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
	SignupRoutingModule,
	FormsModule,
    ReactiveFormsModule,
	MatCardModule,
	MatIconModule,
	MatAutocompleteModule,
	MatButtonModule,
	MatInputModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
