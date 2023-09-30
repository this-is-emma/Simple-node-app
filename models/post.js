//MODEL
const { Schema, model, mongoose } = require('mongoose');
const Populate = require('../util/autopopulate');

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subpage: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upVotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  voteScore : { type: Number },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

// Always populate the author field
postSchema
.pre('findOne', Populate('author'))
.pre('find', Populate('author'));

module.exports = model('Post', postSchema);
