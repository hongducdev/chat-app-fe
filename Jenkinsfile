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
        // Testing system
        stage('Testing') {
            steps{
                dir('DevopsChatApp') {
                    script {
                        echo 'Testing... be continued...'
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
    }
    post {
        success {
            // Các bước sau khi build thành công
            echo 'Tesing and building and pushing Docker image successfully.'
        }
        failure {
            // Các bước sau khi build thất bại
            echo 'Testing or building or pushing Docker image failed.'
        }
    }
}
