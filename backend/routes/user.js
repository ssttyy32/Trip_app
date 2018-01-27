var User = require('../models/user');

module.exports = function (router) {
    var userRoute = router.route('/users');
    var userIdRoute = router.route('/users/:id');

    // GET for /api/users
    userRoute.get(function (req, res) {
      var query = User.find({});

      query.exec(function(err, users) {
        if (err) {
          res.status(500).send({
            message: 'server error',
            data: []
          });
        } else {
          res.status(200).send({
            message: 'get users successfully',
            data: users
          })
        }
      });
    });


    //PUT for /api/users/:id
    // push plan to user's history
    userIdRoute.put(function (req, res) {

      User.findByIdAndUpdate(req.params.id, {$push: {"history" : req.body.plan}}, {new : true},function(err, singleUser) {
        if (err) {
          res.status(500).send({
            message: 'server error',
            data: []
          });
        } else {
          if(singleUser != null) {
            res.status(200).send({
              message: 'put user by id successfully',
              data: singleUser
            });
          } else{
            res.status(404).send({
              message: 'user not found',
              data: []
            });
          }
        }
      });
    });

    return router;
};
