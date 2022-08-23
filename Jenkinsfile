pipeline {
  agent any
  environment {
    def PACKAGE_JSON = readJSON file: 'package.json'
    PROJECT_NAME = "${PACKAGE_JSON.name}"
    PROJECT_VERSION = "${PACKAGE_JSON.version}"
  }
  options {
    ansiColor('xterm')
  }

  tools { 
    nodejs "node16" 
  }

  stages {
    stage('Install Dependencies') {
      steps {
        echo '+-----------------------------------+'
        echo '| NPM Install                       |'
        echo '+-----------------------------------+'
        sh 'npm install'
      }
    }

    stage('Verify code') {
      steps {
        echo '+-----------------------------------+'
        echo '| Check code style ESLint           |'
        echo '+-----------------------------------+'
        sh 'npm run eslint'
      }
    }

    // stage('Code Quality Check via SonarQube') {
    //     environment {
    //         scannerHome = tool 'SonarQubeScanner'
    //     }
    //     steps {
    //         withSonarQubeEnv('SonarQube') {
    //             sh "${scannerHome}/bin/sonar-scanner"
    //         }
    //         timeout(time: 10, unit: 'MINUTES') {
    //             waitForQualityGate abortPipeline: true
    //         }
    //     }
    // }

    stage('Docker Build') {
      steps {
        echo '+-----------------------------------+'
        echo '| Docker Build                      |'
        echo '+-----------------------------------+'
        sh 'docker build -t ${PROJECT_NAME}-ci-temp:${PROJECT_VERSION} --build-arg REACT_APP_BACKEND_URL=${DEV_REACT_APP_BACKEND_URL} .'
      }
    }

    // stage('Deploy Localhost CI Temp') {
    //   steps {
    //     echo '+-----------------------------------+'
    //     echo '| Docker run CI Temp                |'
    //     echo '+-----------------------------------+'
    //     sh 'docker stop ${PROJECT_NAME}-ci-temp || true'
    //     sh 'docker rm ${PROJECT_NAME}-ci-temp || true'
    //     sh 'docker run -d --name ${PROJECT_NAME}-ci-temp --restart always -p 8101:8080 ${PROJECT_NAME}-ci-temp:${PROJECT_VERSION}'
    //   }
    // }

    // stage('Cypress test e2e') {
    //   steps {
    //     echo '+-----------------------------------+'
    //     echo '| Cypress test e2e                  |'
    //     echo '+-----------------------------------+'
    //     sh 'npm run cypress:ci'
    //   }
    // }

    stage('Deploy Localhost Develop') {
      when {
        expression { return BRANCH_NAME ==~ /master/ }
      }
      steps {
        echo '+-----------------------------------+'
        echo '| Docker buid specific version      |'
        echo '+-----------------------------------+'
        sh 'docker build -t ${PROJECT_NAME}-dev:${PROJECT_VERSION} --build-arg REACT_APP_BACKEND_URL=${DEV_REACT_APP_BACKEND_URL} .'

        echo '+-----------------------------------+'
        echo '| Docker run Develop                |'
        echo '+-----------------------------------+'
        sh 'docker stop ${PROJECT_NAME}-dev || true'
        sh 'docker rm ${PROJECT_NAME}-dev || true'
        sh 'docker run -d --name ${PROJECT_NAME}-dev --restart always -p 8100:8080 ${PROJECT_NAME}-dev:${PROJECT_VERSION}'
      }
    }

    stage('Deploy Localhost QA') {
      when {
        expression { return BRANCH_NAME ==~ /v(.*)/ }
      }
      steps {
        echo '+-----------------------------------+'
        echo '| Docker buid specific version      |'
        echo '+-----------------------------------+'
        sh 'docker build -t ${PROJECT_NAME}-qa:${PROJECT_VERSION} --build-arg REACT_APP_BACKEND_URL=${QA_REACT_APP_BACKEND_URL} .'

        echo '+-----------------------------------+'
        echo '| Docker run QA                       |'
        echo '+-----------------------------------+'
        sh 'docker stop ${PROJECT_NAME}-qa || true'
        sh 'docker rm ${PROJECT_NAME}-qa || true'
        sh 'docker run -d --name ${PROJECT_NAME}-qa --restart always -p 8200:8080 ${PROJECT_NAME}-qa:${PROJECT_VERSION}'
      }
    }
  }
  
//   post {
//     always {
//       script {
//         currentBuild.result = currentBuild.result ?: 'SUCCESS'
//         notifyBitbucket()
//       }
//       junit 'cypress/results/cypress-report.xml'
      
//       // remove container after test
//       sh 'docker stop ${PROJECT_NAME}-ci-temp || true'
//       sh 'docker rm ${PROJECT_NAME}-ci-temp || true'
//     }
//   }

}
