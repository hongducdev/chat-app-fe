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
        stage('Docker Image Build And Run') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose build'
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
