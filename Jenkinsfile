pipeline {
    agent any

    environment {
        APP_NAME = "crud-api"
        HEALTH_URL = "https://crud-anc.duckdns.org/health"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npx prisma generate'
            }
        }

        stage('Test') {
            steps {
                sh '''
                if npm run | grep -q " test"; then
                    npm test
                else
                    echo "No test script found. Skipping tests."
                fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                pm2 restart $APP_NAME || pm2 start src/server.js --name $APP_NAME
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                sleep 10
                curl --fail $HEALTH_URL
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment successful."
        }

        failure {
            echo "Deployment failed. Restarting previous PM2 process."
            sh '''
            pm2 restart $APP_NAME || true
            '''
        }
    }
}
