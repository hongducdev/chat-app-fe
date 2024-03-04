pipeline {
    agent any
    environment {
        GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-fe.git'
    }
    stages {
        // Dọn dẹp thư mục
        stage("Cleanup") {
            steps {
                deleteDir ()
            }
        }
        //Thiết lập nhánh main và đường đẫn git
        stage ('Git Checkout') {
            steps {
                dir ("DevopsChatApp"){
                  script {
                    git branch: 'main', url: env.GITHUB_REPO_URL
                  }
                }
            }
        }
        // Dọn dẹp hệ thống docker
        stage('Clean Docker System') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker system prune -af'
                    }
                }
            }
        }
        // Xây dựng docker từ src code với các câu lệnh từ Dockerfile
        stage('Docker Build') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose build'
                    }
                }
            }
        }
        // Chạy docker
        stage('Docker Run') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose up -d'
                    }
                }
            }
        }
        // Testing
        stage('Testing') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        echo 'Testing... be continued...'
                    }
                }
            }
        }
    }
    post {
        success {
            // Các bước sau khi build thành công
            echo 'Test and build and push Docker image successfully.'
        }
        failure {
            // Các bước sau khi build thất bại
            echo 'Test or build or push Docker image failed.'
        }
    }
}
