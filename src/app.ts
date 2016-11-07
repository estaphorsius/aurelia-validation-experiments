import { ValidationControllerFactory, ValidationController, validateTrigger, ValidationRenderer, ValidationRules } from "aurelia-validation";
import { FormValidationRenderer } from "./validation-renderer";
import { Person } from "./person";

export class App {
  public static inject() { return [ValidationControllerFactory]; }
  person: Person;
  valid: boolean;

  validationController: ValidationController;

  constructor(private validationControllerFactory: ValidationControllerFactory) {
    this.validationController = this.validationControllerFactory.createForCurrentScope();
    this.validationController.validateTrigger = validateTrigger.blur;
    this.validationController.addRenderer(new FormValidationRenderer());
    this.person = new Person();
    this.validationController.reset();
  }

  bind() {
    ValidationRules
      .ensure((p: Person) => p.name).displayName("Name of person").required().maxLength(20)
      .ensure((p: Person) => p.email).displayName("Emailaddress").required().email().maxLength(30)
      .on(this.person);
  }

  submit(): void {
    this.validationController.validate()
      .then(errors => {
        if (errors.length === 0) {
          this.valid = true;
        }
        else {
          this.valid = false;
        }
      });
  }
}
