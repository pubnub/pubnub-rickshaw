Pubnub + Rickshaw
===============

Make your Rickshaw graphs realtime with PubNub.

## Quickstart

```
new Rickshaw.Fixtures.PubNub({
  graph: graph,
  subscribe_key: 'demo',
  channel: 'rickshaw-channel-2',
  history: true,
  connect: init,
});
```

Parameter | Value | Default
| :------------ |:---------------:| -----:|
| graph | Your Rickshaw.Graph. Works just like the extensions included in Rickshaw examples. | ```undefined```
| subscribe_key | Your PubNub subscribe_key | ```'demo'```
| limit | How many values on the x series to display before shifting data | ```50```
| history | Use PubNub history call to retrieve last ```limit``` messages. Requires PubNub storage to be enabled. | ```false```
| connect | This function fires once data has been retrieved from PubNub. Some extensions assume the graph will have data when they are initialized, so we ca n put them inside here. | ```function(){}```

## Simple Example

Include the Javascripts within your file.

```
<!doctype html>
<script src="http://cdn.pubnub.com/pubnub.min.js"></script>
<script src="../vendor/d3.v3.js"></script>
<script src="../rickshaw.min.js"></script>
<script src="../src/js/Rickshaw.Fixtures.PubNub.js"></script>

<div id="chart"></div>



<script>
var graph = new Rickshaw.Graph( {
    element: document.getElementById("chart"),
    width: 900,
    height: 500,
    renderer: 'area',
    stroke: true,
    preserve: true,
    series: [
        {
            color: 'steelblue',
            name: 'Cats',
            data: []
        },
        {
            color: 'lightblue',
            name: 'Dogs',
            data: []
        }
    ]
});

graph.render();

new Rickshaw.Fixtures.PubNub({
  channel: 'rickshaw-channel-1',
  graph: graph
});

</script>
```

## Publish Messages

This uses the included PubNub library to pubnub.publish() 
packets to the pubnub.subscribe() call waiting inside the 
framework. 

Notice how the subscribe_key and channel name matches.

You probably want to publish data from the backend instead. 
Check out our docs for more info:

http://www.pubnub.com/docs


```
var pubnub = PUBNUB.init({
  publish_key: 'demo',
  subscribe_key: 'demo'
});

setInterval(function(){
  pubnub.publish({
    channel: 'rickshaw-channel-1',
    message: {
      y: [
        Math.random() * 99, 
        Math.random() * 99
      ],
      x: new Date().getTime()
    }
  })
}, 1000);
</script>
``` 