import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema({
	content: String,
	date: Date,
});
// create a schema for the client data
const clientSchema = new Schema({
	principalApplicant: {
		type: String,
		required: false,
	},
	contact: {
		type: String,
		required: false,
	},
	caseSize: {
		type: Number,
		required: false,
	},
	country: {
		type: String,
		required: false,
	},
	pendingCase: {
		type: Boolean,
		required: false,
	},
	applicationDate: {
		type: Date,
		required: false,
	},
	caseType: {
		type: String,
		required: false,
	},
	receipt: {
		type: String,
		required: false,
	},
	caseStatus: {
		type: String,
		required: false,
	},
	lawyer: {
		type: String,
		required: false,
	},
	notes: {
		type: [noteSchema],
		required: false,
	},

	interviewDate: {
		type: Date,
		required: false,
	},
	biometricsDate: {
		type: Date,
		required: false,
	},
	approvalDate: {
		type: Date,
		required: false,
	},
	denialDate: {
		type: Date,
		required: false,
	},
	caseClosingDate: {
		type: Date,
		required: false,
	},
},
	{
		timestamps: true
	});

// create a model for the client data
const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

// export the model
export default Client;
