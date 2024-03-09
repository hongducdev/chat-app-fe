pipeline {
    agent any
    environment {
        GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-fe.git'
        DOCKER_IMAGE_NAME = 'chat-app-fe'
        DOCKER_USER_NAME = 'hongducdev'
        DOCKER_HUB_CREDENTIALS = credentials('hongducdev-chatapp')
        VERSION = '1.0.${BUILD_NUMBER}'
    }

    stages {
        stage("Cleanup") {
            steps {
                deleteDir()
                script {
                    def runningContainers = sh(script: 'sudo docker-compose ps -q', returnStdout: true).trim()
                    if (runningContainers) {
                        sh 'sudo docker-compose stop ${runningContainers}'
                    } else {
                        echo 'No running containers'
                    }

                    def containers = sh(script: 'sudo docker-compose ps -aq', returnStdout: true).trim()
                    if (containers) {
                        sh 'sudo docker-compose rm -f ${containers}'
                    } else {
                        echo 'No containers'
                    }
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

        stage('Docker Build') {
            steps {
                dir('DevopsChatApp') {
                    script {
                        sh 'sudo docker-compose build -t ${DOCKER_IMAGE_NAME}:${VERSION} .'
                        sh 'sudo docker-compose tag ${DOCKER_IMAGE_NAME}:${VERSION} ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION}'
                    }
                }
            }
        }

        stage('Docker Login and Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_HUB_CREDENTIALS) {
                        sh 'sudo docker login -u $DOCKER_USER_NAME --password-stdin <<< $DOCKER_HUB_CREDENTIALS_PSW'
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
