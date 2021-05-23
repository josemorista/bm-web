pipeline {
	agent any
	environment {
		sshuser = credentials('bm-deploy-ssh-user')
		host = credentials('bm-deploy-ssh-host')
		artifact = 'bmwartifact.tgz'
		directory = '/home/ubuntu/bmweb'
		API_URL = 'https://api.bm-diag.org'
	}

	tools {nodejs "nodejs"}

	stages {
		stage('Build') {
			steps {
				sh '''
					npm install
					echo NEXT_PUBLIC_API_URL=$API_URL &> .env
					npm run build
					tar cfz $artifact node_modules public .env package.json .babelrc .next
					scp $artifact $sshuser@$host:/tmp/$artifact
					rm -rf ./*
				'''
			}
		}
		stage('Deploy') {
			steps {
				sh '''
					ssh -o StrictHostKeyChecking=no -T $sshuser@$host << EOF
					cd /tmp
					mkdir -p $directory
					rm -rf $directory/*
					tar -xf /tmp/$artifact -C $directory
					rm /tmp/$artifact
					cd $directory
					pm2 delete process.json
					pm2 start process.json
EOF'''
			}
		}
	}
}