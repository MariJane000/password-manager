export default class Validators {
  static required(value) {
    return value && value.length >= 1;
  }

  static minLength(value, valueLength) {
    return value && value.length >= valueLength;
  }

  static emailValidator(value) {
    return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
  }
}