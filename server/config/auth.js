'use strict';

module.exports = {
  
  'twitterAuth': {
    'consumerKey': process.env.TWITTER_KEY,
    'consumerSecret': process.env.TWITTER_SECRET,
    'callbackURL': process.env.CALLBACK_URL + 'api/user/auth/twitter/callback'
  },

};
