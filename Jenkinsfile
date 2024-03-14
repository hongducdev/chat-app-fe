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
                  // env.BRANCH_NAME = env.GIT_BRANCH.substring(env.GIT_BRANCH.lastIndexOf('/') + 1)
                  git branch: env.BRANCH_NAME, url: env.GITHUB_REPO_URL
               }
            }
         }
      }
      stage('Deploy in develop') {
         when {
            branch 'develop'
         }
         steps {
            dir('DevopsChatApp') {
               script {
                  echo("Code pushed or merged in branch ${env.BRANCH_NAME}")
                  sh 'sudo docker system prune -af'
                  sh 'sudo docker stop $(docker ps --filter status=running || exists -q) || true'
                  sh 'sudo docker rm $(docker ps -aq) || true'
                  sh 'sudo docker rmi $(docker images -q) || true'
                  sh 'docker build -t $DOCKER_IMAGE_NAME .'
                  sh 'docker run -dp 4953:80 $DOCKER_IMAGE_NAME'
               }
            }
         }
      }
      stage('Deploy in production') {
         when {
            branch 'main'
         }
         steps {
            dir('DevopsChatApp') {
               script {
                  echo("Code pushed or merged in branch ${env.BRANCH_NAME}")
                  sh 'sudo docker system prune -af'
                  sh 'sudo docker stop $(docker ps --filter status=running || exists -q) || true'
                  sh 'sudo docker rm $(docker ps -aq) || true'
                  sh 'sudo docker rmi $(docker images -q) || true'
                  sh 'sudo docker login -u ${DOCKER_USER_NAME} -p ${DOCKER_HUB_PASSWORD}'
                  sh 'ls -a'
                  sh 'cp .env ./chat-app-fe'
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
