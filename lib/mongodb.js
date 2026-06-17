import mongoose from "mongoose";

const connectMongoDB = async () => {
	// readyState 1 = connected, 2 = connecting. In both cases we're good
	// to reuse the existing connection rather than opening a new one.
	if (mongoose.connections[0].readyState) return;

	if (!process.env.MONGODB_URI) {
		throw new Error("MONGODB_URI is not set");
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
		// Re-throw so callers can fail fast with a clean error response
		// instead of silently querying a dead connection.
		throw error;
	}
};

export default connectMongoDB;
