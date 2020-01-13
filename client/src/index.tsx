import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MovieService } from './services/MovieService';

ReactDOM.render(<App />, document.getElementById('root'));

// const movie = {
//     name: '撕裂末日',
//     types: ['科幻'],
//     areas: ['中国大陆'],
//     timing: 100,
//     hot: true,
//     soon: false,
//     classics: true
// }

// MovieService.add(movie).then(res => {
//     console.log(res);
// });

// MovieService.findById("5e1c7414731bc51ef08b60c0").then(res => {
//     console.log(res);
// });

// MovieService.find({page: 2, limit: 5}).then(res => {
//     console.log(res);
// });

// MovieService.updata("5e1c7414731bc51ef08b60c0", {
//     name: '心灵捕手'
// }).then(res => {
//     console.log(res);
// });

// MovieService.delete("5e1c7414731bc51ef08b60c0").then(res => {
//     console.log(res);
// });

// MovieService.findById("5e1c7414731bc51ef08b60c0").then(res => {
//     console.log(res);
// });