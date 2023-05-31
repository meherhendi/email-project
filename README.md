this project is written in Angular and Nestjs frameworks and uses Localstack to emulate AWS's SES (Simple Email Service)


instructions to run the project:

# prerequisites
port 80,3000 and 4566 must be available for containers to work

# 1- spin up the containers
docker-compose up

# 2- create .env file
cp backend/.env.example backend/.env

# 1- open a bash terminal in the localstack container
docker exec -it <localstack container id> /bin/bash

# 2- create an IAM user called test
awslocal iam create-user --user-name test

# 3- get access key for the user
awslocal iam create-access-key --user-name test

# 4- get the credentials generated and add them to your backend/.env file 

# 5- verify emails in Localstack's SES (verification is necessary)
awslocal ses verify-email-identity --email-address sender@example.com 

awslocal ses verify-email-identity --email-address receiver@example.com

# 6- send a mock-up email
awslocal ses send-email \
    --from sender@example.com \
    --message 'Body={Text={Data="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."}},Subject={Data=Test Email}' \
    --destination 'ToAddresses=receiver@example.com'

# 7- open http://localhost/ and log in
username: john
password: changeme


** features **

used localstack ses service
email obscured in the interface 
user can see a list of emails and select an email to view
user can only reply once to emails he received



