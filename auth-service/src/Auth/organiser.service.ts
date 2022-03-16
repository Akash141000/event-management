import { Injectable } from "@nestjs/common";
import { Organiser } from "./model/organiser.model";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class OrganiserService{
    private hashRounds:number = 12;
    private organiser:Organiser | undefined;
    constructor(@InjectRepository(Organiser) private organiserRepo:Repository<Organiser>){}


    async insert(email:string,name:string,password:string,confirmPassword:string){
        const hashedPassword = await bcrypt.hash(password,this.hashRounds);
        return (await this.organiserRepo.insert({email,name,password:hashedPassword})).raw;
    }


    async find(email:string):Promise<Organiser>{
        this.organiser = await this.organiserRepo.findOne({email:email});
        return this.organiser;
    }

    async compare(password:string):Promise<boolean>{
        return bcrypt.compare(password,this.organiser.password);
    }


    async logginOrganiser(){
        return this.organiserRepo.update({organiserId:this.organiser.organiserId},{isLogged:true});
    }
}