$AWSProfile='fra-dev'
$BucketProfileName='fra-master'
$BucketName='fra-euwest1'

aws s3 cp .\CreateScheduledCreation.yml  s3://${BucketName}/CreateScheduledCreation.yml --profile $BucketProfileName
aws s3api put-object-acl --bucket $BucketName --key CreateScheduledCreation.yml --acl public-read --profile $BucketProfileName   

aws cloudformation create-stack --stack-name CreateScheduledCreation `
--template-url https://${BucketName}.s3.amazonaws.com/CreateScheduledCreation.yml `
--capabilities CAPABILITY_IAM  `
--disable-rollback `
--parameter ParameterKey=DownloadCommands,ParameterValue="git clone https://github.com/FrederiqueRetsema/DistrolessContainerCypress; git checkout wordpress" `
            ParameterKey=VpcId,ParameterValue="vpc-0262eba2519b993e7" `
            ParameterKey=SubnetId,ParameterValue="subnet-0dcefa6fc75a5845f" `
            ParameterKey=ContainerName,ParameterValue="distroless-container" `
            ParameterKey=ContainerTag,ParameterValue="0.0.1" `
            ParameterKey=ECRRepository,ParameterValue="040909972200.dkr.ecr.eu-west-1.amazonaws.com/distroless-container" `
            ParameterKey=S3BucketWithTestResults,ParameterValue="fra-testresults" `
            ParameterKey=S3BucketKeyPrefix,ParameterValue="distroless-container" `
            ParameterKey=S3BucketWithCloudFormationTemplates,ParameterValue="fra-euwest1" `
            ParameterKey=CypressImage,ParameterValue="cypress/included:10.4.0" `
            ParameterKey=EC2KeyName,ParameterValue="EC2Key-fra-dev" `
            ParameterKey=ScheduleExpression,ParameterValue="cron(0/15 * ? * * *)" `
--profile ${AWSProfile} 
