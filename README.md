# Email project

this project is written in Angular and Nestjs frameworks and uses Localstack to emulate AWS's SES (Simple Email Service)


instructions to run the project:

# prerequisites
port 80,3000 and 4566 must be available for containers to work

# steps to run the project

* 1- create .env file
cp backend/.env.example backend/.env

* 2- spin up the containers
docker-compose up



* 3- open a bash terminal in the localstack container
docker exec -it <localstack container id> /bin/bash

* 4- create an IAM user called test
awslocal iam create-user --user-name test

* 5- get access key for the user
awslocal iam create-access-key --user-name test

* 6- get the credentials generated and add them to your backend/.env file 

* 7- verify emails in Localstack's SES (verification is necessary)
awslocal ses verify-email-identity --email-address sender@example.com 

awslocal ses verify-email-identity --email-address receiver@example.com

* 8- send a mock-up email
awslocal ses send-email \
    --from sender@example.com \
    --message 'Body={Text={Data="Lorem ipsum dolor sit amet, consectetur adipiscing elit, ..."}},Subject={Data=Test Email}' \
    --destination 'ToAddresses=receiver@example.com'

* 9- open http://localhost/ and log in
username: john
password: changeme


** features **

used localstack ses service
email obscured in the interface 
user can see a list of emails and select an email to view
user can only reply once to emails he received



