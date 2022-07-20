# DistrolessContainerCypress
This is an example repo for a generic solution for creating distroless (shell-less) containers. Are you in a hurry? Than skip to the part called "How to use this template".

## How it works
In this directory is the CloudFormation template. That template will create a Virtual Machine (EC2-Instance) which will create shell-less container images in ECR. It will use ldd and strace as tools to create the shell-less images.

Building the image contains of four parts, which are in the docker directory:

1) The part that is in __dockerfile-head__. This part will take care of downloading the base image, the installation of necessary packages etc. The part will generally end with a FROM scratch statement.
2) The COPY --from=build _directory-with-file_ _directory-with-file_ commands
3) The part that is in __dockerfile-tail__. You can add extra COPY commands if you want to, or add RUN commands. It will generally end with switching to another user (when you don't want the container to run as root). This part is used for testing the container as well. 
4) The part that is in __dockerfile-entrypoint__. This part is NOT used for the tests. In the tests, this part will be replaced by the ldd or strace commands. The ldd and strace commands themselves will NOT be included in the shell-less container.

When the containerfile is built, the layers will be removed by exporting and importing the started container. 

## Shell scripts
To get the right results, you might need to start a database. Or to do other configuration outside the container. The virtual machine uses Docker to create the shell-less images, you can change the following shell scripts to suit your extra needs:

* __start-test.sh__: Should at least start the tests, but you can add starting a database, seeding data into a database or starting other containers as well.  
* __exec-ldd.sh__: Should deliver COPY --from=build *directory-with-file* *directory-with-file* lines to stdout.    
* __exec-strace.sh__: Should deliver COPY --from=build *directory-with-file* *directory-with-file* lines to stdout as well. Will in general just respond to read actions in the strace output.  
* __stop-test.sh__: You can use this script to stop the extra containers.

## Variables
Within the shell scripts you can use the following variables:

* __{LOCALHOST}__: will be replaced by the IP address of the EC2 instance. This cannot be 127.0.0.1 or the text localhost: Docker needs this to be an address that is accessable from the network. 
* __{NAME}__: the name of the container image (from the parameters of the CloudFormation template)
* __{CONTAINER_TAG}__: the tag of the container image (from the parameters of the CloudFormation template)

## CloudFormation template
The CloudFormation template has the following parameters:
* __EC2InstanceType__ : type of the EC2 instance
* __EC2KeyName__ : Key of the EC2 instance 
* __AmazonLinux2AMI__ : Don't change this parameter, you will get the newest Amazon Linux AMI available  

* __DownloadCommands__: command(s) to download the repository. In general this will be a git clone to your CodeCommit (or Github) repository.

* __SubnetId__ : the subnet where the EC2 Instance should run

* __ContainerName__: Meaningfull name of the container
* __ContainerTag__: Tag for the container. It will always add the tag "latest" to it as well.

* __ECRRepositoryUrl__: URL to the ECR repository.
* __S3BucketWithTestResults__: Name of the S3 bucket where videos and screenshots will be stored. S3 keys will have the format /__Name__/__Date__/videos and /__Name__/__Date__/screenshots. The EC2 instance will copy all data from e2e/cypress/screenshots and e2e/cypress/videos to these directories.

The template will start the EC2 instance, will create the containers and then stop. You can safely delete this stack after the ECR images are created, the creation and deletion of these ECR repositories is NOT part of this template.

When any of the scripts result in an exit code which is different to zero, the EC2-image will fail to start. The videos and screenshots (if any) are first put in the S3 bucket before the EC2 instance fails. 

## Assumptions and restrictions

### Tests
The implicit assumption is that your test will cover literally EVERY ACTION that can be done by end-users. When that is done, then any file that is not used by end-users is not included in the shell-less container. 

This is good, because it reduces the attack surface of a hacker. When there is no shell in the container, and no curl/wget command, and there are no tools or modules to access other systems, then it is much more difficult to distribute malware than that you use a container with a shell.

The disadvantage is that you really need to simulate everything that can be done by an end-user: when you fail to do so your container may give errors when a user tries to do something that wasn't part of the tests.

When the test fails, the new container image will not be uploaded to ECR.

### Linux
This template only works for Linux containers.

### Security
Distroless containers are not the solution to take care of every thread. When a hacker is able to take over the memory of the host computer, then the hacker can still do a lot of damage in your environment. When the hacker is able to run commands on the shell in the container, the distroless containers solve this issue by not having a shell
and not having commands like wget and curl within the container. 

### Dependency on package manager of host OS
By creating tests for (next to) all use cases of your website, you can automate the creation of new distroless containers. The assumption here is that the package manager
of the host OS will do its job to distribute new versions of libraries and software as fast as possible to the users of the base OS.

## Branches
In this repository there are two branches: 
1) the __master__ branch contains the template. 
2) The __wordpress__ branch contains an example that is based on WordPress.

# How to use this template

## When you wouldn't use distroless

In this master branch, a very simple Apache httpd website is created. When you wouldn't use the distroless verion, the Dockerfile would look like:

FROM alpine:latest
RUN  apk upgrade --no-cache &&\
     apk add apache2 && \
     chown apache:apache /var/log/apache2 && \
     sed -i 's/Listen 80/Listen 8080/' /etc/apache2/httpd.conf && \
     sed -i 's/#ServerName www.example.com:80/ServerName www.example.com:8080/' /etc/apache2/httpd.conf &&\
     echo "Hello Distroless" > /var/www/localhost/htdocs/index.html 
USER apache
ENTRYPOINT ["/usr/sbin/httpd","-D","FOREGROUND"]

This Dockerfile contains of two parts:
1) The part that describes which files are used in the Dockerfile (the FROM and RUN commands)
2) The part that is used to give the right permissions and the command that should be started when the container is started (USER and ENTRYPOINT commands)

## Now you want to use distroless

* Put the FROM and RUN commands in the docker/dockerfile-head file. Add AS build to the FROM line
* Put the USER and ENTRYPOINT commands in the docker/dockerfile-tail file. In the example, you see that a COPY command for the httpd command itself is also added to the dockerfile-tail file. 
* Add all tests under the e2e directory in the repo.
* Change the base URL in the e2e/cypress.config.js file. The {LOCALHOST} part will be replaced by the local IP address of the build virtual machine.
* When the distroless container misses files or directories, you can change the file exec-cp-head.sh. In general, creating the directory under /build_dir/tar should be enough.

## Calling the distribution

## Maintenance
You will have to change the Cypress version number in the file e2e/package.json a few times per year, unfortunately Cypress doesn't use the *latest* tag. You can find the version list of the container cypress/included via Docker hub: https://hub.docker.com/r/cypress/included/tags

