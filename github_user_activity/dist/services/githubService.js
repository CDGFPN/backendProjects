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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
let jsonData = {};
// Function to fetch data with timeout
const fetchWithTimeout = (url, options, timeout = 8000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), timeout)),
    ]);
};
const fetchData = (username, commandTypeFilter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetchWithTimeout(`https://api.github.com/users/${username}/events`);
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        if (response.status === 404) {
            throw new Error("User not found. Please check the username and try again.");
        }
        jsonData = yield response.json();
        if (jsonData.length === 0) {
            console.log(`No data found for ${commandTypeFilter}!`);
            return;
        }
        if (commandTypeFilter) {
            let filteredData = {};
            filteredData = jsonData.filter((data) => data.type.toLowerCase() === commandTypeFilter);
            console.log(`Event of type ${commandTypeFilter} data:\n`, filteredData);
            return;
        }
        console.log("Data fetched:\n", jsonData);
    }
    catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
});
exports.fetchData = fetchData;
