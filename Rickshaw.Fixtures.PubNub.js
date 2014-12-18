Rickshaw.namespace('Rickshaw.Fixtures.PubNub');

Rickshaw.Fixtures.PubNub = function (options) {

  if(typeof(PUBNUB) == "undefined" && console) {
    console.error("PubNub not found. See http://www.pubnub.com/docs/javascript/javascript-sdk.html#_where_do_i_get_the_code");
  }

  var self = this;

  // set default options
  options.publish_key = options.publish_key || 'demo';
  options.subscribe_key = options.subscribe_key || 'demo';
  options.limit = options.limit || 50;
  options.history = options.history || false;
  options.connect = options.connect || function () {};

  // initialize pubnub
  self.pubnub = PUBNUB.init({
    publish_key: options.publish_key,
    subscribe_key: options.subscribe_key
  });

  // push pubnub message data to end of series
  self.pushMessage = function (m) {

    var i = 0;
    while(i < m.y.length) {

      options.graph.series[i].data.push({ 
        x: m.x, 
        y: m.y[i]
      });

      i++;
    
    }

    // shift the array if we're over limit
    if(options.graph.series[0].data.length > options.limit) {

      i = 0;
      while(i < options.graph.series.length) {
        options.graph.series[i].data.shift();
        i++;
      }

    }

    // render the graph
    options.graph.update();

  };

  // subscribe to the pubnub channel
  self.pubnub.subscribe({
    channel: options.channel,
    message: function (m) {

      self.pushMessage(m);

    },
    connect: options.connect
  });

  if(options.history) {

    // fetch last x messages from pubnub
    self.pubnub.history({
      count: options.limit,
      channel: options.channel,
      callback: function (message) { 

        // add the messages to the series data
        i = 0;
        while(i < message[0].length) {
          self.pushMessage(message[0][i]);
          i++;
        }

      }

    });

  }

};