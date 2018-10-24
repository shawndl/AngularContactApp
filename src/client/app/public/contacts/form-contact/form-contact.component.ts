import {Component, Output, EventEmitter, Input, SimpleChange, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {ValidationErrorsService} from '../../../services/validation/validation-errors.service';
import {MongooseContactInterface} from '../../../services/interfaces/mongoose-contact-interface';

@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent implements OnChanges, OnInit {
  @Input() oldContact: MongooseContactInterface;
  contactForm: FormGroup;
  emailsField: FormArray;
  phonesField: FormArray;
  @Output() submitContact = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              public validatorErrors: ValidationErrorsService) { }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oldContact']) {
      this.buildForm();
    }
  }

  /**
   * add an email address form group
   * @return {void}
   */
  addEmail(): void {
    this.emailsField.push(this.getEmptyEmailGroup());
  }

  /**
   * removes an email form group by index
   * @param index
   * @return {void}
   */
  removeEmail(index: number): void {
    this.emailsField.removeAt(index);
  }

  /**
   * add an email address form group
   * @return {void}
   */
  addPhone(): void {
    this.phonesField.push(this.getEmptyPhoneGroup());
  }

  /**
   * removes an email form group by index
   * @param index
   * @return {void}
   */
  removePhone(index: number): void {
    this.phonesField.removeAt(index);
  }

  /**
   * sets default values for the form
   * @return {void}
   */
  private getDefaultValues(field: string): string {
    if (!this.oldContact) {
      return null;
    }
    return this.oldContact[field];
  }

  /**
   * build the contact form option
   * @return void
   */
  private buildForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: this.formBuilder.control(this.getDefaultValues('firstName'), Validators.required),
      lastName: this.formBuilder.control(this.getDefaultValues('lastName'), Validators.required),
      emails: this.formBuilder.array(this.getEmailForm()),
      phones: this.formBuilder.array(this.getPhoneForm())
    });
    this.emailsField = this.contactForm.get('emails') as FormArray;
    this.phonesField = this.contactForm.get('phones') as FormArray;
  }

  /**
   * get a form group for email addresses
   * @return {FormGroup}
   */
  private getEmailForm(): FormGroup[] {
    if (!this.oldContact) {
      return [
        this.getEmptyEmailGroup()
      ];
    }
    return this.getEmailsOldContact();
  }

  /**
   * get a single for group for emails that is empty
   * @return {FormGroup}
   */
  private getEmptyEmailGroup(): FormGroup {
    return this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      emailType: this.formBuilder.control(null, Validators.required)
    });
  }

  /**
   * get emails for when there is an old contact
   * used when the form is being edited and default values need to be set
   * @return {FormGroup[]}
   */
  private getEmailsOldContact(): FormGroup[] {
    const formGroupArray: FormGroup[] = [];
    for (const item of this.oldContact.emails) {
      const formGroup = this.formBuilder.group({
        email: this.formBuilder.control(item.email, [Validators.required, Validators.email]),
        emailType: this.formBuilder.control(item.emailType, Validators.required)
      });
      formGroupArray.push(formGroup);
    }
    return formGroupArray;
  }

  /**
   * get a form group for phone
   * @return {FormGroup}
   */
  private getPhoneForm(): FormGroup[] {
    if (!this.oldContact) {
      return [
        this.getEmptyPhoneGroup()
      ];
    }
    return this.getPhonesOldContact();
  }

  /**
   * get a single for group for phones that is empty
   * @return {FormGroup}
   */
  private getEmptyPhoneGroup(): FormGroup {
    return this.formBuilder.group({
      phone: this.formBuilder.control(null, [Validators.required, Validators.pattern('^[1-90]+$')]),
      phoneType: this.formBuilder.control(null, Validators.required)
    });
  }

  /**
   * get phone numbers for when there is an old contact is set
   * used when the form is being edited and default values need to be set
   * @return {FormGroup[]}
   */
  private getPhonesOldContact(): FormGroup[] {
    const formGroupArray: FormGroup[] = [];
    for (const item of this.oldContact.phones) {
      const formGroup = this.formBuilder.group({
        phone: this.formBuilder.control(item.phone, [Validators.required, Validators.pattern('^[1-90]+$')]),
        phoneType: this.formBuilder.control(item.phoneType, Validators.required)
      });
      formGroupArray.push(formGroup);
    }
    return formGroupArray;
  }

  onSubmitForm() {
    if (this.contactForm.valid) {
      this.submitContact.emit(this.contactForm.value);
      return;
    }
  }
}
