import * as yup from 'yup';


const schema = yup.object().shape({
            avatar: yup.mixed(),

            gender: yup
            .string()
            .nullable()
            .oneOf(['Woman', 'Man'], "Pleace select your gender"),

            name: yup
            .string()
            .min(2, 'Name must be greater than or equal to 2 characters long')
    .max(40, 'Name must be less than or equal to 40 characters long'),

    email: yup.string().email('Please enter a valid email address'),
   
    weight: yup
    .number()
    .nullable()
    .min(20, 'Weight must be greater than or equal to 20')
    .max(200, 'Weight must be less than or equal to 200')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),

    activityTime: yup
        .number()
    .nullable()
    .min(0)
    .max(12, 'Time must be less than or equal to 12')
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    }),

  desiredVolume: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      if (originalValue === '') return null;
      return value;
    })
    
    .test('is-decimal', 'Please enter a valid number', (value) => {
      if (value === undefined || value === null || value === '') return true;
      return !isNaN(parseFloat(value)) && isFinite(value);
    })
    .test(
      'min-value',
      'Value must be greater than or equal to 0.1',
      (value) => {
        if (value === undefined || value === null || value === '') return true;
        return parseFloat(value) >= 0.1;
      }
    )
    .test('max-value', 'Value must be less than or equal to 40.2', (value) => {
      if (value === undefined || value === null || value === '') return true;
      return parseFloat(value) <= 40.2;
    }),
});


 