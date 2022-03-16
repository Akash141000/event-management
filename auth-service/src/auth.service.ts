import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { AuthType } from "./util/types";

@Injectable()
export class AuthService{
    getToken(id:number | string,email:string,type:string): string{
        return jwt.sign({id:id,email:email,type:type},process.env.JWT_SECRET,{expiresIn:"1h"})
    }

    checkToken(token:string,type:AuthType): string | jwt.JwtPayload{
        return jwt.verify(token,process.env.JWT_SECRET);
    }
}