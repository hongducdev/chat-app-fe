pipeline {
    agent any
    environment {
        GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-fe.git'
        DOCKER_IMAGE_NAME = 'chat-app-fe'
        DOCKER_USER_NAME = 'hongducdev'
        DOCKER_HUB_PASSWORD = 'HongDuc051002@'
        VERSION = "1.0.${BUILD_NUMBER}"
    }

    stages {
        stage("Cleanup") {
            steps {
                deleteDir()
                script {
                    sh 'sudo docker system prune -af'
                }
            }
        }

        stage('Git Checkout') {
            steps {
                dir("DevopsChatApp") {
                    script {
                        git branch: 'main', url: env.GITHUB_REPO_URL
                    }
                }
            }
        }

        stage('Docker Login and Push') {
            steps {
                script {
                    sh 'sudo docker login -u ${DOCKER_USER_NAME} -p ${DOCKER_HUB_PASSWORD}'
                }
            }
        }

        stage('Docker Build') {
            steps {
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose build -t ${DOCKER_IMAGE_NAME}:${VERSION} .'
                        sh 'sudo docker-compose push ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION}'
                    }
                }
            }
        }

        

        stage('Docker Run') {
            steps {
                script {
                    sh 'sudo docker-compose down'
                    sh 'sudo docker-compose pull'
                    sh 'sudo docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Quá trình hoàn tất.'
        }
        failure {
            echo 'Quá trình thất bại'
        }
    }
}
