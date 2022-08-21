$AWSProfile='fra-dev'
$BucketProfileName='fra-master'
$BucketName='fra-euwest1'

aws s3 cp .\CreateWordpressExample.yml  s3://${BucketName}/CreateWordpressExample.yml --profile $BucketProfileName
aws s3api put-object-acl --bucket $BucketName --key CreateWordpressExample.yml --acl public-read --profile $BucketProfileName   

aws cloudformation create-stack --stack-name CreateWordpressExample `
--template-url https://${BucketName}.s3.amazonaws.com/CreateWordpressExample.yml `
--capabilities CAPABILITY_IAM  `
--parameter ParameterKey=DownloadCommands,ParameterValue='git clone https://github.com/FrederiqueRetsema/DistrolessContainerCypress; cd DistrolessContainerCypress; git checkout wordpress' `
            ParameterKey=CypressImage,ParameterValue='cypress/included:10.6.0' `
            ParameterKey=EC2KeyName,ParameterValue='EC2Key-fra-dev' `
            ParameterKey=S3BucketWithTestResults,ParameterValue='fra-testresults' `
            ParameterKey=S3BucketKeyPrefix,ParameterValue='wordpress-distroless' `
            ParameterKey=ScheduleExpression,ParameterValue='cron(0 0 ? * * *)' `
            ParameterKey=DatabaseName,ParameterValue='wordpress' `
            ParameterKey=DatabasePrefix,ParameterValue='wp_' `
            ParameterKey=DatabaseUserId,ParameterValue='database_admin' `
            ParameterKey=DatabasePassword,ParameterValue='C1nder3llaInW0rdpre$$!' `
            ParameterKey=WordpressUserId,ParameterValue='TestUser' `
            ParameterKey=WordpressPassword,ParameterValue='C1nder3llaInW0rdpre$$!' `
--profile ${AWSProfile} 

Get-Date