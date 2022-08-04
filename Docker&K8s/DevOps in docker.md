# DevOps in docker



### Windows

```bash
# 바탕화면에 docker_volume 폴더 만들기

# sonatype/nexus3
docker run -it --name nexus \
-v c:/Users/%USERNAME%/Desktop/docker_volume/nexus:/nexus-data \
-p 8081:8081 -d sonatype/nexus3

# localhost:8081
# admin
# c:/Users/%USERNAME%/Desktop/docker_volume/nexus/admin.password
# 55811e8c-58ca-41fb-a970-b44d516ce77e


# gitlab-server
# 실제로는 한줄로
docker run --name gitlab \
-v c:/Users/%USERNAME%/Desktop/docker_volume/gitlab/config:/etc/gitlab \
-v c:/Users/%USERNAME%/Desktop/docker_volume/gitlab/logs:/var/log/gitlab \
-v c:/Users/%USERNAME%/Desktop/docker_volume/gitlab/data:/var/lpt/gitlab \
-it -p 8090:80 -d gitlab/gitlab-ee:latest

# localhost:8090
# root
# c:/Users/%USERNAME%/Desktop/docker_volume/gitlab/config/initial_root_password
# GNUMom+5Fkal7leDGO9Xu6DgXEA/LYAwS7Iks3lsggY=
# 이후에 비밀번호 변경하기!


# jenkins
# 실제로는 한줄로
docker run --name jenkins -it -p 8080:8080 \
-v c:/Users/%USERNAME%/Desktop/docker_volume/jenkins:/var/jenkins_home \
-d jenkins/jenkins

# localhost:8080
# c:/Users/%USERNAME%/Desktop/docker_volume/jenkins/secrets/initialAdminPassword

```



---



### AWS

```bash
# port 설정
# nexus : 8971
# git : 8972
# jenkins : 8973

# volume 연동을 위한 directory 생성
mkdir -p devops/nexus

mkdir -p devops/gitlab/config
mkdir -p devops/gitlab/logs
mkdir -p devops/gitlab/data

mkdir -p devops/jenkins

# 모든 권한 (최소 권한이 뭔지 못찾았음)
sudo chmod 777 -R devops

```



*docker-compose.yml*

```yaml
version: "3"
services:
  nexus:
    container_name: 'nexus'
    image: 'sonatype/nexus3'
    ports:
      - '8971:8081'
    volumes:
      - '/home/ubuntu/devops/nexus:/nexus-data'

  git:
    container_name: 'gitlab'
    image: 'gitlab/gitlab-ee:latest'
    ports:
      - '8972:80'
    volumes:
      - '/home/ubuntu/devops/gitlab/config:/etc/gitlab'
      - '/home/ubuntu/devops/gitlab/logs:/var/log/gitlab'
      - '/home/ubuntu/devops/gitlab/data:/var/lpt/gitlab'

  jenkins:
    container_name: 'jenkins'
    image: 'jenkins/jenkins'
    ports:
      - '8973:8080'
    volumes:
      - '/home/ubuntu/devops/jenkins:/var/jenkins_home'

```



```bash
# compose 파일 실행
docker compose up

# 이후에는 docker start로 실행해도 되는듯
docker start nexus
docker start gitlab
docker start jenkins
```

