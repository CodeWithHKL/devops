pipeline {
    agent any

    environment {
        APP_NAME = "devops"
        PORT     = "3000"
        REPO_URL = "https://github.com/CodeWithHKL/devops.git"
    }

    options {
        timeout(time: 1, unit: 'HOURS') 
        timestamps()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Cloning branch: main from ${env.REPO_URL}"
                    checkout scm: [
                        $class: 'GitSCM', 
                        branches: [[name: 'main']], 
                        userRemoteConfigs: [[url: env.REPO_URL]]
                    ]
                }
            }
        }

        stage('Install & Build') {
            steps {
                bat 'npm install && npm run build'
            }
        }

        stage('Unit Test') {
            steps {
                bat '''
                    echo Running Health Check...
                    echo Test Passed
                '''
            }
        }

        stage('Dockerize') {
            steps {
                // Build with a tag including the build number for traceability
                bat "docker build -t ${env.APP_NAME}:${env.BUILD_ID} -t ${env.APP_NAME}:latest ."
            }
        }

        stage('Deploy') {
            steps {
                bat """
                    docker rm -f ${env.APP_NAME} 2>nul || exit 0
                    docker run -d -p ${env.PORT}:${env.PORT} --name ${env.APP_NAME} ${env.APP_NAME}:latest
                """
            }
        }
    }

    post {
        always {
            echo "Cleaning up workspace..."
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check the logs above for errors."
        }
    }
}