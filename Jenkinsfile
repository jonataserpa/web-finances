pipeline {    
    agent any

    stages {
        stage('Get Source') {
            steps {
                git url: 'https://github.com/jonataserpa/Financas.git', branch: 'master'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }  
        
        stage('Mock') {
            steps {
                sh 'npm run mock'
            }
        }  

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        
        // stage('Docker build') {
        //     steps {
        //         script {
        //             dockerapp = docker.build("jonataserpa/financas_web:${env.BUILD_ID}",
        //             "-f ./home/inatel/Documents/cruds/Financas/Dockerfile .")
        //         }
        //     }
        // }
    }
}