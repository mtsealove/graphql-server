import {Field, ID, InputType, ObjectType} from "type-graphql";
import {MaxLength} from "class-validator";
import {Skill} from "../@types";

@ObjectType()
class SkillObject {
    constructor(skill: Skill) {
        this.id = skill.id;
        this.icon = skill.icon;
        this.name = skill.name;
    }

    @Field(type => ID)
    id: number;
    @Field()
    name: string;
    @Field()
    icon: string;
}

@InputType()
class SkillInput {
    @Field()
    @MaxLength(30)
    name!: string;
    @Field()
    icon!: string;
}


export {SkillObject, SkillInput};
