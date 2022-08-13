$BucketProfileName='fra-master'
$BucketName='fra-euwest1'

foreach ($yaml_file in (Get-ChildItem -Path ".\\*.yml")) {
    $long_filename = ($yaml_file).FullName 
    $short_filename = ($yaml_file).Name
    aws s3 cp $long_filename s3://${BucketName}/ --profile $BucketProfileName
    aws s3api put-object-acl --bucket $BucketName --key $short_filename --acl public-read --profile $BucketProfileName   
}