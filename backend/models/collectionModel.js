import mongoose from 'mongoose';

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  topic: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  customFields: [{
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['integer', 'string', 'multilineText', 'boolean', 'date'],
      required: true,
    },
    defaultValue: {
      type: mongoose.Schema.Types.Mixed,
    },
  }],
}, { timestamps: true });

export const Collection = mongoose.model('Collection', CollectionSchema);
