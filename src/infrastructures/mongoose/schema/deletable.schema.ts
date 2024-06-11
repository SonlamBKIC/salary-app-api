export const deletableSchema = {
  deletedBy: String,
  deletedAt: Number,
  isDeleted: { type: Boolean, default: false },
};
