export class ValidationMessagesService {

  static getValidatorErrorMessage(validatorName: string, valueName: string, validatorValue?: any) {
        const config = {
            'required': `${valueName} is required.`,
            'invalidEmailAddress': 'Invalid email address'
        };

        return config[validatorName];
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        // tslint:disable-next-line:max-line-length
        const er = control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if (er) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }
}
