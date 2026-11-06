pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
    timestamps()
  }

  parameters {
    booleanParam(
      name: 'DEPLOY_TO_EC2',
      defaultValue: false,
      description: 'Deploy the pushed images to EC2 after publishing them'
    )
    string(
      name: 'EC2_HOST',
      defaultValue: '',
      trim: true,
      description: 'EC2 public DNS name or IP (required when deployment is enabled)'
    )
    choice(
      name: 'EC2_USER',
      choices: ['ubuntu', 'ec2-user'],
      description: 'SSH login user for the EC2 AMI'
    )
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.IMAGE_TAG = sh(
            script: 'git rev-parse --short=12 HEAD',
            returnStdout: true
          ).trim()
        }
      }
    }

    stage('Build and Push') {
      steps {
        withCredentials([
          usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKERHUB_USERNAME',
            passwordVariable: 'DOCKERHUB_TOKEN'
          )
        ]) {
          sh '''
            set -eu
            trap 'docker logout >/dev/null 2>&1 || true' EXIT

            printf '%s' "$DOCKERHUB_TOKEN" | docker login \
              --username "$DOCKERHUB_USERNAME" \
              --password-stdin

            docker build --pull \
              --tag "$DOCKERHUB_USERNAME/medicare-backend:$IMAGE_TAG" \
              ./medicare-backend
            docker build --pull \
              --tag "$DOCKERHUB_USERNAME/medicare-frontend:$IMAGE_TAG" \
              ./frontend

            docker push "$DOCKERHUB_USERNAME/medicare-backend:$IMAGE_TAG"
            docker push "$DOCKERHUB_USERNAME/medicare-frontend:$IMAGE_TAG"
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      when {
        expression { params.DEPLOY_TO_EC2 }
      }
      steps {
        script {
          if (!params.EC2_HOST?.trim()) {
            error('Set EC2_HOST when DEPLOY_TO_EC2 is enabled.')
          }
        }
        withCredentials([
          usernamePassword(
            credentialsId: 'dockerhub-pull-creds',
            usernameVariable: 'DOCKERHUB_USERNAME',
            passwordVariable: 'DOCKERHUB_TOKEN'
          )
        ]) {
          withCredentials([
            sshUserPrivateKey(
              credentialsId: 'ec2-ssh-key',
              keyFileVariable: 'EC2_SSH_KEY'
            )
          ]) {
            sh '''
              set -eu
              REMOTE="$EC2_USER@$EC2_HOST"

              ssh -i "$EC2_SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes "$REMOTE" 'mkdir -p ~/medicare'
              scp -i "$EC2_SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes docker-compose.yaml .env.example \
                "$REMOTE:medicare/"
              ssh -i "$EC2_SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes "$REMOTE" \
                'test -f ~/medicare/.env || { echo "Create ~/medicare/.env from .env.example with production secrets before deploying."; exit 1; }'

              cleanup_remote_login() {
                ssh -i "$EC2_SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes "$REMOTE" \
                  'docker logout >/dev/null 2>&1 || true' || true
              }
              trap cleanup_remote_login EXIT

              printf '%s' "$DOCKERHUB_TOKEN" | ssh -i "$EC2_SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes "$REMOTE" \
                "docker login --username '$DOCKERHUB_USERNAME' --password-stdin"

              ssh -i "$EC2_SSH_KEY" -o IdentitiesOnly=yes -o BatchMode=yes "$REMOTE" \
                "cd ~/medicare && \
                DOCKERHUB_USERNAME='$DOCKERHUB_USERNAME' IMAGE_TAG='$IMAGE_TAG' FRONTEND_PORT=80 docker compose pull backend frontend && \
                DOCKERHUB_USERNAME='$DOCKERHUB_USERNAME' IMAGE_TAG='$IMAGE_TAG' FRONTEND_PORT=80 docker compose up -d --no-build"
            '''
          }
        }
      }
    }
  }
}
