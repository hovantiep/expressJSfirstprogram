var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var khoaHocSchema = new Schema({
    ten: {
        type: String,
        require: true,
        unique: true
    },
    chu_thich: {
        type: String,
        require: true
    }
});

var khoaHoc = mongoose.model('khoahoc', khoaHocSchema);

module.exports = khoaHoc;