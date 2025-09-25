// Admin Types 

export interface Admin{
  email:string,
  password: string
}

export interface JwtPayload{
  adminId:number,
  email:string,
  password:string
}

