var AWS     = require('aws-sdk');
var blessed = require('blessed');
var contrib = require('blessed-contrib');
var screen  = blessed.screen();

var grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

AWS.config.apiVersions = {
  ec2: '2015-10-01'
};

const regions = [
  { name: 'us-east-1', lat: '37.5246558', lon: '-77.5283665', char: 'X', color: 'red' },
  { name: 'us-west-1', lat: '37.7576948', lon: '-122.4727051', char: 'X', color: 'red' },
  { name: 'us-west-2', lat: '45.543387', lon: '-122.7246327', char: 'X', color: 'red' },
  { name: 'eu-west-1', lat: '53.3242995', lon: '-6.3159145', char: 'X', color: 'red' },
  { name: 'eu-central-1', lat: '50.1211908', lon: '8.5663533', char: 'X', color: 'red' },
  { name: 'ap-northeast-1', lat: '35.6733226', lon: '139.6401772', char: 'X', color: 'red' },
  { name: 'ap-northeast-2', lat: '37.5650792', lon: '126.9193392', char: 'X', color: 'red' },
  { name: 'ap-southeast-1', lat: '1.3147298', lon: '103.776808', char: 'X', color: 'red' },
  { name: 'ap-southeast-2', lat: '-33.8679515', lon: '151.2012683', char: 'X', color: 'red' },
  { name: 'sa-east-1', lat: '-23.6823491', lon: '-46.7357242', char: 'X', color: 'red' },
];

var map = grid.set(0, 0, 8, 12, contrib.map, { label: 'AWS Region Map'});
screen.append(map);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

var table = grid.set(8, 0, 4, 12, contrib.table, {
  keys: true,
  fg: 'white',
  selectedFg: 'white',
  selectedBg: 'blue',
  interactive: true,
  label: 'AWS Instances',
  width: '100%',
  height: '30%',
  border: {type: "line", fg: "cyan"},
  columnSpacing: 10,
  columnWidth: [10, 10, 60, 12, 60]
});

table.focus();

screen.append(table);
screen.render()

let tableData = {
  headers: ['Region', 'InstanceID', 'Name', 'Running', 'IP'],
  data: []
};

regions.forEach((region) => {
  let ec2    = new AWS.EC2({ region: region.name });
  let params = {};

  ec2.describeInstances(params, (err, data) => {
    if (err) console.log(err, err.stack);
    data.Reservations.forEach((reservation) => {
      reservation.Instances.forEach((instance) => {
        let name = "";
        for (var i = 0; i < instance.Tags.length; i++) {
          if(instance.Tags[i].Key == "Name") {
            name = instance.Tags[i].Value;
            break;
          }
        }
        map.addMarker({"lon" : region.lon, "lat" : region.lat, color: region.color, char: region.char });
        let ipAddress = (instance.PublicIpAddress ? instance.PublicIpAddress : 'None');
        let runningStatus = (instance.State.Name ? instance.State.Name : 'Not Avail');
        tableData.data.push([region.name, instance.InstanceId, name, runningStatus, ipAddress]);
        table.setData(tableData);
        screen.render();
      });
    });
  });
});
