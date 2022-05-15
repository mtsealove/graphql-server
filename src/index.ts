import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import {buildSchema,Resolver, Query} from 'type-graphql';
import SkillResolver from "./resolvers/SkillResolver";
import multer from 'multer';
import cors from 'cors';
import dotenv from "dotenv";

const config = dotenv.config({
    path : '.env'
})

const main = async () => {
    const upload = multer({
        dest: 'uploads',
    })
    const schema = await buildSchema({
        resolvers: [SkillResolver],
    });
    const apolloServer = new ApolloServer({schema});
    await apolloServer.start();
    const app = Express();
    app.use(cors());

    app.post('/image', upload.single('pic'), (req, res)=>{
        if(req.file) {
            res.json(req.file.filename);
        }
    });

    apolloServer.applyMiddleware({app});

    app.listen(4000,()=> {
        console.log("listening localhost:4000");
    });
}
main();
