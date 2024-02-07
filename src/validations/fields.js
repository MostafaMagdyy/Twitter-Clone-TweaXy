import * as yup from 'yup';
import YupPassword from 'yup-password';
import ValidationErrors from '../shared/errors/ValidationErrors';

YupPassword(yup);

import isUUID from './isUUID.js';

const UUIDField = yup
    .string()
    .test('is-uuid', 'email or phone or username is required field', isUUID)
    .required('UUID is required field');

const emailField = yup
    .string()
    .email(ValidationErrors.INVALID_EMAIL_ERROR)
    .required(ValidationErrors.EMPTY_EMAIL_ERROR);

const passwordField = yup
    .string()
    .min(8, ValidationErrors.PASSWORD_LENGTH_ERROR)
    .minLowercase(1, ValidationErrors.PASSWORD_SMALL_LETTER_ERROR)
    .minUppercase(1, ValidationErrors.PASSWORD_CAPITAL_LETTER_ERROR)
    .minNumbers(1, ValidationErrors.PASSWORD_NUMBER_ERROR)
    .minSymbols(1, ValidationErrors.PASSWORD_SPECIAL_CHARACTER_ERROR)
    .required(ValidationErrors.EMPTY_PASSWORD_ERROR);

const phoneField = yup
    .string()
    .length('phone must be 11 numbers')
    .matches(/^[0-9]+$/, 'phone must be all number')
    .required('phone is required field');

const usernameField = yup
    .string()
    .min(4, ValidationErrors.USERNAME_LENGTH_ERROR)
    .max(191, 'username must be at most 191 characters')
    .required(ValidationErrors.EMPTY_USERNAME_ERROR);

const randomBytesTokenField = (name) =>
    yup
        .string()
        .length(8, `${name} must be 8 characters`)
        .required(`${name} is required field`);

export {
    UUIDField,
    emailField,
    passwordField,
    phoneField,
    usernameField,
    randomBytesTokenField,
};
