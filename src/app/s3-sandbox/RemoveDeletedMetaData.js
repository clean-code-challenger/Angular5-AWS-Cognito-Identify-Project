console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context) {
    console.log(JSON.stringify(event.Records[0].s3, null, '  '));
    var item = event.Records[0].s3.object;
    var tableName = "brocktubre-s3-lambda-dynamodb-integration-sandbox-table";
    var params = {
      TableName: tableName,
      Key : {
        object_id : item.etag,
      }
    };

    console.log("Delete a new item..." + item.etag);
    dynamodb.delete(params, function (err, data) {
      if (err) {
          context.fail('FAIL:  Error deleting item from dynamodb - ' + err);
      }
      else {
          console.log("DEBUG:  deleteItem worked. ");
          context.succeed(data);
      }
  });
};
