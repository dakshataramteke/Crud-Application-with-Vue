export interface GetUsersParams {
 query?: string | undefined;
  page?: number | string ;
  limit?: number | string;
  sortBy?: string;
  order?: string;
}


export interface PaginationQuery {
 query?: string | undefined;
  page?: string;
  limit?: string ;
  sortBy?: string;
  order?: string;
}


// User 
export interface Users {
  firstName: string;
  lastName: string,
  dateOfBirth: string,
  mobileNumber :string,
  address:string
}

