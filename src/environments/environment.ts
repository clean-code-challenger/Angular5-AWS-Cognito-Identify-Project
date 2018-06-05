// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  region: 'us-east-1',
  public_bucket_name: 'brocktubre-s3-sandbox-bucket',
  dynamodb_table_name: 'brocktubre-s3-lambda-dynamodb-integration-sandbox-table',
  firebase: {
    apiKey: 'AIzaSyDk4YyTdWhfQ1S-m9jw6vAefa6IYPRIb2U',
    authDomain: 'brocktubre-bt-website.firebaseapp.com',
    databaseURL: 'https://brocktubre-bt-website.firebaseio.com',
    projectId: 'brocktubre-bt-website',
    storageBucket: 'brocktubre-bt-website.appspot.com',
    messagingSenderId: '675386683012'
  }
};
