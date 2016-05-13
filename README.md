# awsip

This is a dashboard for displaying where the information related to your ec2
instances are located. The problem it was solving for me was I needed the IP
address and instance ids to SSH into them and then do something else for a program
at work.

![picture alt](http://i.imgur.com/PIBANDz.jpg "awsip")

## Install

You will need to save your AWS credentials inside the ```~/.aws/credentials```
on mac or ```C:\Users\<Username>\.aws\credentials``` on windows. If you use the
AWS JS sdk then you probably already have it. If not the credentials file should
look something like this.

```sh
[default]
aws_access_key_id = your_access_key
aws_secret_access_key = your_secret_key
```
Once you are done setting up the AWS auth keys you can use the applications


```sh
$ npm install awsip
```

## Running

To launch the dashboard:

```sh
$ awsip
```

You should be able to see a map of the world that display which regions you have
instances in. These will be marked with a red X.

Then there should be a table below it that lets you highlight instances.

### Want to help contribute?

1. Fork it ( http://github.com/<my-github-username>/dugIt.js/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
