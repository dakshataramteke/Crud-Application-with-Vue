// Edit Form
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  mobile_number: string;
  address: string;
}

// create Form
export interface Data {
  showModel: boolean;
  isLoading: boolean;
  formData: User;
  errors: Errors;
}

// Errors 
export interface Errors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  mobileNumber?: string;
  address?: string;
}

export interface Users {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  mobileNumber: string;
  address: string;
}