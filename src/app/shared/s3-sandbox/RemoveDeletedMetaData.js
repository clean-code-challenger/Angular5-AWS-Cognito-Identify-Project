console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event.Records[0].s3, null, '  '));
    var item = event.Records[0].s3.object;
    var tableName = "brocktubre-s3-lambda-dynamodb-integration-sandbox-table";

    var params = {
      ExpressionAttributeValues: {
        ":n": item.key
      },
      FilterExpression: "object_name = :n",
      ProjectionExpression: "etag",
      TableName: tableName
    };
    console.log(params);
    dynamodb.scan(params, function(err, scanData) {
       if (err) console.log(err, err.stack); // an error occurred
       else {
            var itemEtag = scanData.Items[0].etag;
            var params = {
              TableName: tableName,
              Key : {
                object_id : itemEtag,
              }
            };

            console.log("Delete a new item... " + item.key);
            dynamodb.delete(params, function (err, deleteData) {
              if (err) {
                  context.fail('FAIL:  Error deleting item from dynamodb - ' + err);
              }
              else {
                  console.log("DEBUG:  deleteItem worked. ");
                  context.succeed(deleteData);
              }
          });
       }
    });


};
