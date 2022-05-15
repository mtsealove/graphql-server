import {Arg, Mutation, Query, Resolver} from "type-graphql";
import Database from "../Database";
import {SkillInput, SkillObject} from "../Models";


@Resolver()
class SkillResolver {
    @Query(()=>[SkillObject], {name: 'skills'})
    async getSkills() {
        return await Database.getSkills();
    }
    @Query(()=>SkillObject||null, {name: 'skill'})
    async getSkill(@Arg("id") id: number) {
        return await Database.getSkill(id);
    }
    @Mutation(()=>Boolean, {name: 'addSkill'})
    async postSkill( @Arg("skill") skill: SkillInput)  {
        return await Database.addSkill(skill);
    }

    @Mutation(()=>Boolean, {name: 'deleteSkill'})
    async deleteSkill(@Arg("id") id: number) {
        return await Database.deleteSkill(id);
    }

}

export default SkillResolver
