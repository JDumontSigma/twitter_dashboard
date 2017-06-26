'use strict';

module.exports = {
   logError: function logErrors (err, req, res, next) {
      console.error(err.stack);
      next(err);
   },
   client: function clientErrorHandler( err, req, res, next) {
      if(req.xhr) {
         res.status(500).send({error: 'Something Failed'});
      } else{
         next(err);
      }
   },
   errorHandler: function errorHandler(err, req, res, next) { 
      res.status(500);
      res.render('error', {error: err});
   },
   notFound: function notFound(err, req, res) { 
      res.status(404);
      res.render('error', {error: '404 not found'});
   }
}