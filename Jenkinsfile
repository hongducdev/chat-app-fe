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
        stage('Docker Image Build') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'docker-compose build'
                    }
                }
            }
        }
        stage('Deploy'){
            steps{
                script{
                    sh 'docker-compose up'
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
