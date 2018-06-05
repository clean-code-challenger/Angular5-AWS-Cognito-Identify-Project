console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event.Records[0].s3, null, '  '));
    var item = event.Records[0].s3.object;
    var tableName = "brocktubre-s3-lambda-dynamodb-integration-sandbox-table";
    var datetime = new Date().getTime().toString();
    var objectName = item.key.split('+').join(' ');
    var params = {
        TableName:tableName,
        Item:{
            "object_id": item.eTag,
            "date": datetime,
            "object_name": objectName,
            "etag": item.eTag,
            "size": item.size
        }
    };

    console.log("Adding a new item...");
    dynamodb.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
};
