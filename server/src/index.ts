import { Movie } from "./entities/Movie";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

const m: any = {};
m.name = "电影名称";
m.types = ["恐怖片"];
m.areas = ["中国"];
m.timing = 120;

const movie = plainToClass(Movie, m);

validate(movie).then(err => {
    console.log(err);
});
