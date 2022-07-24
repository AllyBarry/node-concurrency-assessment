var mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    user_id: String,
    name: String,
    current_streams: Number,
    max_streams: Number
},
{
    query:{
        byUserID(user_id){
            return this.where({ user_id: new RegExp(user_id, 'i') })
        }
    }
}
)

module.exports = mongoose.model('User', UserSchema);
