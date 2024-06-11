export const auditableSchema = {
  createdBy: {
    type: String,
    ref: 'User',
  },
  createdAt: Number,
  lastModifiedBy: {
    type: String,
    ref: 'User',
  },
  lastModifiedAt: Number,
};
