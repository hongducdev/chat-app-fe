pipeline {
    agent any
    environment {
        GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-fe.git'
    }

    stages {
        stage("Cleanup") {
            steps {
                deleteDir ()
            }
        }
        stage ('Git Checkout') {
            steps {
                dir ("DevopsChatApp"){
                  script {
                    git branch: 'main', url: env.GITHUB_REPO_URL 
                  }
                }
            }
        }
         stage('Test Automation') {
            steps{
                echo 'Testing'
            }
        }
        stage('Docker Build') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose build'
                    }
                }
            }
        }
        stage('Deploy') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose up -d'
                    }
                }
            }
        }
    }
    post {
        success {
            // Các bước sau khi build thành công
            echo 'Build and push Docker image successfully.'
        }
        failure {
            // Các bước sau khi build thất bại
            echo 'Build and push Docker image failed.'
        }
    }
}
