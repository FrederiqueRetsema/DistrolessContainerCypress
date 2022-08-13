$AWSProfile='fra-dev'
$BucketProfileName='fra-master'
$BucketName='fra-euwest1'

aws s3 cp .\CreateWordpressExample.yml  s3://${BucketName}/CreateWordpressExample.yml --profile $BucketProfileName
aws s3api put-object-acl --bucket $BucketName --key CreateWordpressExample.yml --acl public-read --profile $BucketProfileName   

aws cloudformation create-stack --stack-name CreateWordpressExample `
--template-url https://${BucketName}.s3.amazonaws.com/CreateWordpressExample.yml `
--capabilities CAPABILITY_IAM  `
--disable-rollback `
--parameter ParameterKey=DownloadCommands,ParameterValue="git clone https://github.com/FrederiqueRetsema/DistrolessContainerCypress; git checkout wordpress" `
            ParameterKey=CypressImage,ParameterValue="cypress/included:10.4.0" `
            ParameterKey=EC2KeyName,ParameterValue="EC2Key-fra-dev" `
            ParameterKey=ScheduleExpression,ParameterValue="cron(0/15 * ? * * *)" `
--profile ${AWSProfile} 
