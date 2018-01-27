var Dest = require('../models/dest');

module.exports = function (router) {

  //Endpoint: spots
  var destRoute = router.route('/dests');
  // Endpoint: users; Actions: get; Respond with a List of spots
  destRoute.get(function (req, res){

    var query=Dest.find({});

    //where
    //api/dests?query=Bei...
    if(req.param('query')){
      query=Dest.find({"title": new RegExp('^'+req.param('query'),'i')});
    }

    //api/spots?sort={"rating": 1}
    if(req.param('sort')){
      query.sort(JSON.parse(req.param('sort')));
    }



    query.exec(function(err,dests){
      if(err){
        res.status(500).send({
          message:err,
          data:[]
        });
      }else{
        res.status(200).send({
          message: "success to get Destinations list",
          data:dests
        }
        );
      }
    });


  });

    return router;
}
