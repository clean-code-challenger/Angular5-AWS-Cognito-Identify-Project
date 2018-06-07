export const environment = {
  production: true,
  aws_identity_pool_id: 'us-east-1:9ec9ca94-5d0f-4be2-bdd5-1ab0c0bbbd8c',
  aws_auth_role: 'arn:aws:iam::880898370811:role/Cognito_BrockTubreCognitoIntegrationPoolAuth_Role',
  region: 'us-east-1',
  public_bucket_name: 'brocktubre-s3-sandbox-bucket',
  dynamodb_table_name: 'brocktubre-s3-lambda-dynamodb-integration-sandbox-table',
  auth0: {
    clientID: 'q1cRb6y45UdiZtAfYQ21Bt1LkLg2FbZg',
    domain: 'brocktubre.auth0.com',
    responseType: 'token id_token',
    audience: 'https://brocktubre.auth0.com/userinfo',
    redirectUri: 'http://brocktubre.com/callback',
    scope: 'openid profile'
  },
  env: 'prod'
};
