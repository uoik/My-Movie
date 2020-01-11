import { MovieSchema } from "./db";

MovieSchema.find().then(ms => {
    console.log(ms);
});
