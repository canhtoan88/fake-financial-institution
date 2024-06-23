pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        nodejs('Node') {
          echo 'building application....'
          sh 'npm install'
        }
      }
    }
  }
}
