const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegex = /^[0-9 ()+-]+$/;
const htmlRegex = /<[^>]*>/g;

export const emailValidator = (value: string) =>
  emailRegex.test(value) ? "" : "You have entered an invalid email address!";
export const requiredValidator = (value: string) =>
  value ? "" : "This field is required";
export const phoneValidator = (value: string) =>
  value && phoneRegex.test(value) ? "" : "Please enter valid phone number.";
export const biographyValidator = (value: string) =>
  value && value.replace(htmlRegex, "").length >= 50
    ? ""
    : "Biography must be at least 50 characters long.";
