import * as yup from 'yup';
import YupPassword from 'yup-password'
YupPassword(yup)

// Type augmentaation
declare module 'yup' {
  interface StringSchema {
    ifrequired(errorMessage?: string): StringSchema;
  }
}

// Function augmentations
function ifrequired (this:any,errorMessage?: string) {
  return this.test('if-required', errorMessage, function (this:any,value:any) {
    // Retrieve the custom flag from the validation context
    const context = this.options.context;
    const bypassRequired = context?.bypassRequired || false;

    // Apply the required check conditionally
    if (bypassRequired) {
      return true; // Bypass the required check
    } else {
      // Perform the usual required check
      return value != null && value !== undefined;
    }
  });
}

// Extending Yup with a custom method
yup.addMethod(yup.string, 'ifrequired', ifrequired);

export default yup;