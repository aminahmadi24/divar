const { Schema, Types } = require("mongoose");

const AnnouncementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    neighborhood: { type: String, required: true },
    coordinate: { type: [Number], required: true },
    images: { type: [String], required: false, default: [] }
})