var Spot = require('../models/spot');

module.exports = function (router) {

  //Endpoint: spots
  var spotRoute = router.route('/spots');
  // Endpoint: users; Actions: get; Respond with a List of spots
  spotRoute.get(function (req, res){

    var query=Spot.find({});

    //where
    //api/spots?where={"cityName": "Beijing"}
    if(req.param('where')){
      query=Spot.find(JSON.parse(req.param('where')));
    }

    //api/spots?sort={"rating": 1}
    if(req.param('sort')){
      query.sort(JSON.parse(req.param('sort')));
    }

    //api/spots?skip=60&limit=20
    if(req.param('skip')){
      query.skip(parseInt(req.param('skip')));
    }

    if(req.param('limit')){
      query.limit(parseInt(req.param('limit')));
    }

    if(req.param('count')=='true'){
      query.count({});
    }

    query.exec(function(err,spots){
      if(err){
        res.status(500).send({
          message:err,
          data:[]
        });
      }else{
        res.status(200).send({
          message: "success to get spots list",
          data:spots
        }
        );
      }
    });


  });

    return router;
}
