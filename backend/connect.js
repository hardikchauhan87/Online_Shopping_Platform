const mongoose = require('mongoose');

const mongodb = async () => {
    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect('mongodb://127.0.0.1:27017/foodcourt');
        console.log("Connected to MongoDB");

        // Fetch food items data
        const fetchedData = await mongoose.connection.db.collection("data").find({}).toArray();
       
        // Fetch food category data
        const foodCategoryData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        // Assign fetched data to global variables
        global.food_items = fetchedData;
        global.food_category = foodCategoryData;

        console.log("Food items and categories fetched successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching data", error);
    }
};

module.exports = mongodb;