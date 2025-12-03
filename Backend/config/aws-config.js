const AWS = require("aws-sdk");
const path = require("path");

// Configure AWS SDK to load credentials
AWS.config.update({
  region: "eu-north-1",
  credentials: new AWS.SharedIniFileCredentials({
    profile: "default",
  }),
});

// Fallback to environment variables if file credentials don't exist
if (!AWS.config.credentials) {
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  } else {
    console.warn(
      "⚠️  AWS credentials not found. Set up ~/.aws/credentials file or AWS_ACCESS_KEY_ID + AWS_SECRET_ACCESS_KEY env vars"
    );
  }
}

const s3 = new AWS.S3();
const S3_BUCKET = "nikitasatputebucket";

module.exports = { s3, S3_BUCKET };