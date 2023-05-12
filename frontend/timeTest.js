import React, { useState, useEffect } from "react";

// import moment from "moment";

// const Data = [
//   {
//     key: 1,
//     id: 1,
//     time_in: "7/25/2022 10:45 PM",
//     time_out: "7/25/2022 10:50 PM",
//     gender: "Man",
//     race: "white",
//     emotion: "angry",
//   },
// ];

// //time in
// let test = Data[0].time_in;
// // console.log(test.length);
// let test1 = test.substring(0, 1);
// const quantity1 = test1;
// let months = parseInt(quantity1, 10);

// let test2 = test.substring(2, 4);
// const quantity2 = test2;
// let days = parseInt(quantity2, 10);

// let test3 = test.substring(5, 9);
// const quantity3 = test3;
// let years = parseInt(quantity3, 10);

// let test4 = test.substring(10, 12);
// const quantity4 = test4;
// let hours = parseInt(quantity4, 10);

// let test5 = test.substring(13, 15);
// const quantity5 = test5;
// let mins = parseInt(quantity5, 10);
// console.log(test5);
// //time out
// let Time = Data[0].time_out;
// let Time1 = Time.substring(0, 1);
// const quantity11 = Time1;
// let months2 = parseInt(quantity11, 10);

// let Time2 = Time.substring(2, 4);
// const quantity22 = Time2;
// let days2 = parseInt(quantity22, 10);

// let Time3 = Time.substring(5, 9);
// const quantity33 = Time3;
// let years2 = parseInt(quantity33, 10);

// let Time4 = Time.substring(10, 12);
// const quantity44 = Time4;
// let hours2 = parseInt(quantity44, 10);

// let Time5 = Time.substring(13, 15);
// const quantity55 = Time5;
// let mins2 = parseInt(quantity55, 10);

// const m1 = moment({ y: years, M: months - 1, d: days, h: hours, m: mins });
// console.log(m1);
// const m2 = moment({ y: years2, M: months2 - 1, d: days2, h: hours2, m: mins2 });

// console.log(m2.diff(m1, "minutes"));

// var myObject = { a: 1, b: 2, c: 3 };

// // returns a new object with the values at each key mapped using mapFn(value)
// function objectMap(object, mapFn) {
//   return Object.keys(object).reduce(function (result, key) {
//     result[key] = mapFn(object[key]);
//     return result;
//   }, {});
// }

// var newObject = objectMap(myObject, function (value) {
//   return value;
// });

// console.log(newObject);
// // => { 'a': 2, 'b': 4, 'c': 6 }

// console.log(myObject);
// // => { 'a': 1, 'b': 2, 'c': 3 }

// let [yAxes, setyAxes] = useState([0, 0, 0, 0]);

// setyAxes((yAxes[0] = 1));

// console.log(yAxes);
