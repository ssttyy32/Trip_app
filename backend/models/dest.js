var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


// "_id": {
//         "$oid": "5a17a6685baecb7bacb5ca66"
//     },
//     "spotName": "Rui's Home 2",
//     "location": "2 Changan Street",
//     "rating": "5",
//     "duration": "2",
//     "type": [
//         "strong"
//     ],
//     "image": "https://media-exp2.licdn.com/media/AAEAAQAAAAAAAAqcAAAAJDRmOWI4MGI0LTFjOGItNGNiZC05YjU1LWRmZWFhMTYyY2Y2MA.jpg",
//     "cityName": "Beijing",
//     "overview": "Rui Xia 2 is so strong"}

var destSchema = mongoose.Schema({
    title	: String,
    country	: String,
    image : {type:String, default:"https://www.plus.co.th/assets/img/product/list/default.jpg"},
});


module.exports = mongoose.model('Dest', destSchema);
