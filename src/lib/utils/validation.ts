import * as yup from "yup";

/**
 * Options for the validate function
 * @property {boolean} [checkAllFields=false] - If true, all fields in the data object will be validated against the schema. If false, only fields that are defined in the schema will be validated.
 * @property {boolean} [checkDatabase=false] - If true, the data will be validated against the database. If false, the data will only be validated against the schema.
 * @property {boolean} [castToSchema=true] - If true, the data will be cast to the schema. If false, the data will not be cast to the schema and returned as it is.
 * @property {function} [formatField] - A function that takes a key and value and returns a formatted value. This function will be applied to each field in the data object before validation
 */
interface ValidateOptions {
  checkAllFields?: boolean; // If true, all fields in the data object will be validated against the schema. If false, only fields that are defined in the schema will be validated.
  checkDatabase?: boolean;
  castToSchema?: boolean;
  ignoreDatabase?: Object;
  formatField?: (key: string, value: any) => any;
}

const setNestedError = (errorsObj: any, path: string, message: string) => {
  const keys = path.split(".");
  let current = errorsObj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }

  current[keys[keys.length - 1]] = message;
};

/**
 * Validates data against a schema
 * @param {any} data - The data to be validated.
 * @param {yup.ObjectSchema<any>} schema - The schema to validate the data against.
 * @param {ValidateOptions} options - Options for the validate function
 * 
 * @returns {Promise<{error: any, data: any, errormessage?:string, success: boolean}>} - Returns an object with the following properties: error,errormessage, data, success.
 */
export const validate = async (
  data: any,
  schema: yup.ObjectSchema<any>,
  { checkAllFields = false, checkDatabase = false, castToSchema = true, formatField = (a: string, b: any) => b }: ValidateOptions = {}
): Promise<{ error?: any; data?: any; errormessage?: string; success?: boolean }> => {
  try {
    let validationSchema = schema;

    // Transform data based on the provided formatField function
    const transformedData = Object.keys(data).reduce<Record<string, string>>((acc, key) => {
      acc[key] = formatField ? formatField(key, data[key]) : data[key];
      return acc;
    }, {});

    const validationResult = await validationSchema.validate(transformedData, {
      abortEarly: false,
      stripUnknown: !checkAllFields,
      context: {
        checkDatabase: checkDatabase,
        bypassRequired: !checkAllFields,
      },
    });

    return {
      error: null,
      data: castToSchema ? validationResult : data,
      success: true,
    };
  } catch (error) {
    // If validation fails, return the validation errors
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.reduce<Record<string, any>>((acc, err) => {
        if (err.path) {
          setNestedError(acc, err.path, err.message);
        }
        return acc;
      }, {});

      return {
        error: errors,
        errormessage: "Validation failed.",
      };
    }

    // Handle other types of errors (e.g., database errors)
    return {
      error: error,
      errormessage: "An error occurred during signup.",
    };
  }
};
