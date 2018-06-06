console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();
var s3 = new AWS.S3();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event.Records[0].s3, null, '  '));
    var item = event.Records[0].s3.object;
    var bucket = event.Records[0].s3.bucket;
    var tableName = "brocktubre-s3-lambda-dynamodb-integration-sandbox-table";
    var datetime = new Date().getTime().toString();
    var objectName = item.key.split('+').join(' ');

    var headObjectParams = {
        Bucket: bucket.name,
        Key: item.key
    };

    s3.headObject(headObjectParams, function(err, headObjectData) {
        if (err) {
            console.log(err, err.stack); // an error occurred
        }
        else {
            console.log(headObjectData);           // successful response
            var metadata = headObjectData.Metadata;
            var params = {
                TableName:tableName,
                Item:{
                    "object_id": item.eTag,
                    "object_name": objectName,
                    "object_display_name": metadata.object_display_name,
                    "created_by": metadata.created_by,
                    "created_on": datetime,
                    "modified_on": datetime,
                    "modified_by": metadata.created_by,
                    "size": item.size,
                    "etag": item.eTag
                }
            };
            console.log("Adding a new item... " + params);
            dynamodb.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("Added item:", JSON.stringify(data, null, 2));
                }
            });
        }
    });
};
