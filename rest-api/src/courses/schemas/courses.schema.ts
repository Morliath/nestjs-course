import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    seqNo: { type: Number ,  default: 0},
    url: String,
    iconUrl: String,
    courseListIcon: String,
    description: String,
    longDescription: String,
    category: String,
    lessonsCount: Number,
    promo: Boolean
})