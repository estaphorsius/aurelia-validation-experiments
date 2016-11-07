import { ValidationRules } from "aurelia-validation";

export class Person {
    public name: string;
    public email: string;

    public static setupRules(instance: Person){
    ValidationRules
      .ensure((p: Person) => p.name).displayName("Name of person").required().maxLength(20)
      .ensure((p: Person) => p.email).displayName("Emailaddress").required().email().maxLength(30)
      .on(instance);
    }
}
