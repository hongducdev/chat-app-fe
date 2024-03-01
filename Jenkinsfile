pipeline {
    agent any
    environment {
        // Thiết lập các biến môi trường nếu cần
        DOCKER_IMAGE_NAME = 'chat-app-reacjs'
        GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-fe.git'
        DOCKER_USER_NAME = 'hiuhuyn'
        VERSION_NUMBER = '1.0.${BUILD_NUMBER}'
    }

    stages {
        stage("Cleanup") {
            steps {
                deleteDir ()
                script {
                    def runningContainers = sh(script: 'docker ps -q', returnStdout: true).trim()
                    if (runningContainers) {
                        sh "docker stop $runningContainers"             
                    } else {
                        echo "Không có container đang chạy."
                    }
                    def container = sh(script: 'docker ps -a -q', returnStdout: true).trim()
                    if(container){
                        sh 'docker rm $(docker ps -a -q)'
                    }else{
                        echo "Không có container."
                    }
                  }
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
                        sh "docker build -t ${DOCKER_IMAGE_NAME}:${VERSION_NUMBER} ." 
                        sh "docker tag ${DOCKER_IMAGE_NAME}:${VERSION_NUMBER} ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION_NUMBER}"
                        withCredentials([usernamePassword(credentialsId: 'my-docker-hub', usernameVariable: 'docker_user', passwordVariable: 'docker_pass')]) {
                            sh "docker login -u '${docker_user}' -p '${docker_pass}'"
                        }
                        sh "docker push ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION_NUMBER}"
                        sh "docker image prune -af"
                    }
                }
            }
        }
        stage('Deploy'){
            steps{
                script{
                    sh "docker run -dp 4953:4953 ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION_NUMBER}"
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
