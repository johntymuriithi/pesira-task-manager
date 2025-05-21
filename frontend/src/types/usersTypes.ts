// Type definitions
export interface User {
    id: null;
    type: string
    username: string;
    email: string,
    roles: null
  }
  
  export interface SignUp {
    username: string;
    email: string;
    password: string;
    status: string;  // Changed from roles to match the component implementation
  }
  
  export interface Login {
    username: string;   // Changed from username to match the component implementation
    password: string;
  }
  
  interface LoginFormFields extends HTMLFormControlsCollection {
    emailLogin: HTMLInputElement;
    passWord: HTMLInputElement;
  }
  
  export interface LoginFormElements extends HTMLFormElement {
    readonly elements: LoginFormFields;
  }
  
  interface SignUpFormFields extends HTMLFormControlsCollection {
    emailSignup: HTMLInputElement;
    username: HTMLInputElement;
    confirmPassword: HTMLInputElement;
    formRadio: HTMLInputElement;
  }
  
  export interface SignUpFormElements extends HTMLFormElement {
    readonly elements: SignUpFormFields;
  }