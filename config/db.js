const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;

// mongodb://127.0.0.1:27017/quiz-app?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0
// mongodb+srv://story:story@cluster0.r3hqf.mongodb.net/story-app?retryWrites=true&w=majority
