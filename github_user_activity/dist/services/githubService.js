"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Define the URL to fetch data from
const url = 'https://api.github.com/users/CDGFPN/events';
// Create an object to store the JSON data
let jsonData = {};
// Function to fetch data with timeout
const fetchWithTimeout = (url, options, timeout = 8000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeout))
    ]);
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetchWithTimeout(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        jsonData = yield response.json();
        console.log('Data fetched and stored:', jsonData);
    }
    catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
fetchData();
