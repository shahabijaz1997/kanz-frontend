export const hasLowerCase = (text: string) => {
    let lowerCaseLetters = /[a-z]/g;
    return text.match(lowerCaseLetters);
};
export const hasUpperCase = (text: string) => {
    let upperCaseLetters = /[A-Z]/g;
    return text.match(upperCaseLetters);
};
export const hasNumbers = (text: string) => {
    let numbers = /[0-9]/g;
    return text.match(numbers);
};
export const hasSpecialCharacters = (text: string) => {
    let specials = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return text.match(specials);
};
export const isValidEmail = (email: string) => {
    let emailValidator = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/i;
    return email.match(emailValidator);
};