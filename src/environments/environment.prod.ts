export const environment = {
  production: true,
  aws_identity_pool_id: 'us-east-1:7bb23c9c-8021-4603-b31d-09287867c85c',
  aws_auth_role: 'arn:aws:iam::880898370811:role/Cognito_BrockTubreCognitoIdentityPoolProdAuth_Role',
  region: 'us-east-1',
  public_bucket_name: 'brocktubre-s3-sandbox-bucket',
  dynamodb_table_name: 'brocktubre-s3-lambda-dynamodb-integration-sandbox-table',
  auth0: {
    clientID: 'q1cRb6y45UdiZtAfYQ21Bt1LkLg2FbZg',
    domain: 'brocktubre.auth0.com',
    responseType: 'token id_token',
    audience: 'https://brocktubre.auth0.com/userinfo',
    redirectUri: 'https://brocktubre.com/callback',
    scope: 'openid profile'
  },
  apiGateway: {
    processQrCodeUrl: 'https://dr1yb4vbs0.execute-api.us-east-1.amazonaws.com/integration/process-code/'
  },
  env: 'prod'
};
