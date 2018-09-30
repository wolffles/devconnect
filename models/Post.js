const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//We're making a post model where if user deletes post the comments don't delete unless user deletes it.

//Create Schema
const PostSchema = new Schema({
    user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = Post = mongoose.model('post', PostSchema);

