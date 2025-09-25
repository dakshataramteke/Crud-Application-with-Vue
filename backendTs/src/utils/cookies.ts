import { Response } from 'express';

export const setCookie = (res: Response, name: string, value: string, options = {}) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure:false,
    sameSite:"lax",
    path:"/",
    maxAge: 60 * 60 * 24 * 4, 
  });
};