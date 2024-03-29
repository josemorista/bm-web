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
				sh('npm install')
				sh('echo "..." >> ./.env.local')
				sh('rm .env.local')
				sh('echo "NEXT_PUBLIC_API_URL=$API_URL" >> ./.env.local')
				sh('npm run build')
				sh('tar cfz $artifact node_modules public .env.local package.json .babelrc .next process.json')
				sh('scp $artifact $sshuser@$host:/tmp/$artifact')
				sh('rm -rf ./*')
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