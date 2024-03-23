pipeline {
   agent any
   environment {
      GITHUB_REPO_URL = 'https://github.com/hongducdev/chat-app-fe.git'
      DOCKER_IMAGE_NAME = 'chat-app-fe'
      VERSION = "1.0.${BUILD_NUMBER}"
      BRANCH_NAME = "${GIT_BRANCH.substring(GIT_BRANCH.lastIndexOf('/') + 1)}"
   }
   stages{
      stage('Fetch repository') {
         steps {
            deleteDir()
            dir('DevopsChatApp') {
               script {
                  git branch: env.BRANCH_NAME, url: env.GITHUB_REPO_URL
               }
            }
         }
      }
      stage('Deploy in develop') {
         when {
            branch 'develop'
         }
         stages {
            stage('Clean up') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        echo("Code pushed or merged in branch ${env.BRANCH_NAME}")
                        sh 'sudo docker system prune -af'
                        sh 'sudo docker stop $(docker ps --filter publish=4953 -q) || true'
                        sh 'sudo docker rm $(docker ps --filter publish=4953 -q) || true'
                        sh 'sudo docker rmi $(docker images --filter reference=chat-app-fe* -q) || true'
                     }
                  }
               }
            }
            stage('Build and run') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        sh 'docker build -t $DOCKER_IMAGE_NAME .'
                        sh 'docker run -dp 4953:80 $DOCKER_IMAGE_NAME'
                     }
                  }
               }
            }
            stage('Test automation') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        sh 'sudo cp ../../test_server.pem ./test_server.pem'
                        sh 'sudo ssh -i "./test_server.pem" root@18.136.43.101 "bash command.sh run"'
                     }
                  }
               }
            }
         }
      }
      stage('Deploy in production') {
         when {
            branch 'main'
         }
         stages {
            stage('Clean up') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        echo("Code pushed or merged in branch ${env.BRANCH_NAME}")
                        sh 'sudo docker system prune -af'
                        sh 'sudo docker stop $(docker ps --filter publish=5173 -q) || true'
                        sh 'sudo docker rm $(docker ps --filter publish=5173 -q) || true'
                        sh 'sudo docker rmi $(docker images --filter reference=chat-app-fe* -q) || true'
                     }
                  }
               }
            }
            stage('Build and run') {
               steps {
                  dir('DevopsChatApp') {
                     script {
                        sh 'sudo docker login -u ${DOCKER_USER_NAME} -p ${DOCKER_HUB_PASSWORD}'
                        sh 'cp ../../.env .'
                        sh 'sudo docker build -t ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION} .'
                        sh 'sudo docker push ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION}'
                        sh 'sudo docker run -dp 5173:80 ${DOCKER_USER_NAME}/${DOCKER_IMAGE_NAME}:${VERSION}'
                        sh 'docker logout'
                     }
                  }
               }
            }
         }
      }

   }
}
