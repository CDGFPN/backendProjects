const fs = require("fs");
const DATA_FILE = "data.json";
const initialData = [];

const fileHandler = {
  generateId: () => {
    if (fs.readFileSync(DATA_FILE, "utf-8") === "[]") {
      return 1;
    }
    const parseData = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const id = parseData[parseData.length - 1].id + 1;
    return id;
  },

  createFileIfNotExists: () => {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 4));
      console.log(`File '${DATA_FILE}' created.`);
    }
  },

  fetchData: () => {
    if (fs.readFileSync(DATA_FILE, "utf-8") === "[]") return [];
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  },

  isDataJsonFilePresent: () => {
    if (!fs.existsSync(DATA_FILE)) {
      throw new Error("Cannot perform this operation. 'data.json' file not found. Please create this file by using the addTask function or do it manually.");
    }
    return true;
  },

  saveData: (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
  }
};

module.exports = fileHandler;