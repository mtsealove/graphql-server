import mysql, {RowDataPacket} from 'mysql2';
import {SkillInput, SkillObject} from "./Models";
import {Skill} from "../@types";

const pool = mysql.createPool({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 4,
});

class Database {

    static getSkills = (): Promise<SkillObject[]> => {
        return new Promise<SkillObject[]>((resolve, reject) => {
            pool.getConnection((poolErr, connection)=>{
                if(poolErr) {
                    reject();
                } else {
                    connection.query('select * from skills', (err, result: Skill[]) => {
                        if (err) {
                            console.error(err);
                            reject();
                        } else {
                            const r: SkillObject[] = [];
                            result.forEach((item) => {
                                r.push(new SkillObject(item));
                            })
                            resolve(r);
                        }
                        connection.destroy();
                    });

                }
            })
        })
    }

    static getSkill = (id: number): Promise<SkillObject | null> => {
        return new Promise<SkillObject | null>((resolve, reject) => {
            pool.getConnection((poolErr, connection)=>{
                if(poolErr) {
                    reject();
                } else {
                    //@ts-ignore
                    connection.query('select * from skills where id = ?', [id], (err, result: Skill[]) => {
                        if (err) {
                            console.error(err);
                            reject();
                        } else {
                            if (result.length === 0) {
                                resolve(null);
                            } else {
                                resolve(result[0]);
                            }
                        }
                        connection.destroy();
                    })
                }
            })
        })
    }

    static addSkill = (skill: SkillInput): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const {name, icon} = skill;
            pool.getConnection((poolErr, connection)=>{
                if(poolErr) {
                    reject();
                } else {
                    connection.query('insert into skills set ?', {
                        name, icon
                    }, (err) => {
                        if (err) {
                            console.error(err);
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                        connection.destroy();
                    });
                }
            })
        });
    }

    static deleteSkill = (id: number): Promise<boolean> =>
        new Promise<boolean>((resolve, reject) => {
            pool.getConnection((poolErr, connection)=>{
                if(poolErr){
                    reject();
                } else {
                    connection.query('delete from skills where id = ?', id, (err, result) => {
                        if (err) {
                            console.error(err);
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                }
            })
        });

}

export default Database;
