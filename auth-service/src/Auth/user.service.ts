import {InjectRepository} from "@nestjs/typeorm"
import {  Injectable } from "@nestjs/common";
import { User } from "./model/user.model";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService{
    private hashRounds:number = 12;
    private user:User | undefined;
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}


    async insert(email:string,username:string,password:string,confirmPassword:string){
        const hashedPassword = await bcrypt.hash(password,this.hashRounds);
        return (await this.userRepository.insert({email,username,password:hashedPassword})).raw;
    }


    async find(email:string):Promise<User>{
        this.user = await this.userRepository.findOne({email:email});
        return this.user;
    }

    async compare(password:string):Promise<boolean>{
        return await bcrypt.compare(password,this.user.password);
    }

    check(id:number):boolean{
        if(this.user.userId !== id){
            return false
        }
        return true;
    }


    async logginUser(){
        return this.userRepository.update({userId:this.user.userId},{isLogged:true});
    }

}