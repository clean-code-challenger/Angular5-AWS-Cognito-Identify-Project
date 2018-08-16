// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  aws_identity_pool_id: 'us-east-1:9ec9ca94-5d0f-4be2-bdd5-1ab0c0bbbd8c',
  aws_auth_role: 'arn:aws:iam::880898370811:role/Cognito_BrockTubreCognitoIntegrationPoolAuth_Role',
  aws_unauth_role: 'arn:aws:iam::880898370811:role/Cognito_BrockTubreCognitoIntegrationPoolUnauth_Role',
  region: 'us-east-1',
  public_bucket_name: 'brocktubre-s3-sandbox-bucket',
  dynamodb_table_name: 'brocktubre-s3-lambda-dynamodb-integration-sandbox-table',
  auth0: {
    clientID: 'o10co8Eu-ethIXGsm36vwKdvbIY9FdTp',
    domain: 'brocktubre.auth0.com',
    responseType: 'token id_token',
    audience: 'https://brocktubre.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  },
  qrReader: {
    s3: {
      qrCodeCaptureBucket: 'qr-code-capture'
    },
    apiGateway: {
      processQrCodeUrl: 'https://dr1yb4vbs0.execute-api.us-east-1.amazonaws.com/integration/process-code/'
    },
    dynamoDb : {
      tableName: 'qr-code-info'
    }
  },
  grades: {
    dynamoDb : {
      tableName: 'grades-table'
    },
    lambda : {
      functionName: 'get-grades-with-secret-id'
    }
  }
};
