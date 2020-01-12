import { MovieService } from "./services/MovieService";

// const m: any = {
//     name: '流浪地球',
//     types: ['科幻'],
//     areas: ['中国大陆'],
//     timing: 120,
//     hot: true,
//     soon: true,
//     classics: true
// };

// MovieService.add(m).then(result => {
//     if (Array.isArray(result)) {
//         console.log(result);
//     } else {
//         console.log(result._id);
//     }
// });

// const m: any = {
//     name: '撕裂末日'
// };

// MovieService.updata('5e1ad60b87a8c82688aa3fd0', m).then(result => {
//     if (result.length > 0) {
//         console.log(result);
//     } else {
//         console.log('修改成功');
//     }
// });

// MovieService.findById("5e1ad60b87a8c82688aa3fd0").then(result => {
//     if (!result) {
//         return;
//     }
//     console.log(result);
// });

// MovieService.remove("5e1ad60b87a8c82688aa3fd0").then(() => {
//     console.log("删除成功");
// });
