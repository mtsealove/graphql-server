import {Stream} from "stream";

declare namespace NodeJS {
    interface Process {
        env: ProcessEnv
    }
     interface ProcessEnv {
         DB_HOST: string;
         DB_NAME: string;
         DB_USER: string;
         DB_PASSWORD: string;
     }
}

declare interface Skill {
    id: number;
    name: string;
    icon: string;
}

declare interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}
