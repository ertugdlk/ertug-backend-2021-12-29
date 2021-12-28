import { Schema, model, Document } from 'mongoose';
import { IGarment, IImage } from './garment.interfaces';

export const ImageSubSchema: Schema = new Schema<IImage>(
    {
        url: { type: String },
        path: { type: String },
        checksum: { type: String },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                delete ret.__v;
                delete ret._id;
            },
        },
    },
);

export interface IGarmentDocument extends IGarment, Document {}

export const GarmentSchema: Schema<IGarmentDocument> = new Schema(
    {
        product_categories_mapped: [{ type: String }],
        product_id: { type: String },
        url: { type: String },
        gender: { type: String },
        price: { type: Number },
        product_description: { type: String },
        image_urls: [{ type: String }],
        product_imags_src: [{ type: String }],
        source: { type: String },
        product_categories: [{ type: String }],
        images: [ImageSubSchema],
        position: [{ type: String }],
        product_title: { type: String },
        brand: { type: String },
        currency_code: { type: String },
        stock: { type: Number },
    },
    {
        toJSON: {
            transform(_doc, ret) {
                delete ret.__v;
                _doc.score = ret.score;
            },
        },
    },
);

GarmentSchema.index({
    title: 'text',
    product_description: 'text',
});
const GarmentModel = model<IGarmentDocument>('Garment', GarmentSchema);
GarmentModel.createIndexes();

export default GarmentModel;
