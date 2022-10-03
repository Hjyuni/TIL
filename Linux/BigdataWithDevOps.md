# Bigdata with DevOps



![](C:\Users\dongheon\Desktop\Spring Cloud_MSA\devops.jpg)

### 0. base

ubuntu 20 (big / 1234)

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install vim -y

# java
wget https://corretto.aws/downloads/latest/amazon-corretto-11-x64-linux-jdk.tar.gz
tar xvzf amazon-corretto-11-x64-linux-jdk.tar.gz 
ln -s amazon-corretto-11.0.16.8.1-linux-x64/ java

# path 설정
sudo vim ~/.bashrc

# java
export JAVA_HOME=/home/big/java
export PATH=$PATH:$JAVA_HOME/bin
# 저장

source ~/.bashrc

java -version
javac -version


# python
# ubuntu 20 에는 python3.8 이 설치되어 있음
python3 -V
# pip 설치
sudo apt install python3-pip -y
pip -V

# python alias 설정
sudo vim ~/.bashrc

# python
alias python=python3
# 저장

source ~/.bashrc

python -V
python3 -V
pip -V


# docker engine
# install using the repository
sudo apt install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

# install docker engine
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

# sudo 없이 docker 사용
sudo chmod 666 /var/run/docker.sock

docker ps

# docker 로 파일 전송
# docker cp 외부파일경로 컨테이너이름:컨테이너내부경로
# ex) docker cp test.txt mycontainer:/data

```





### 1. bigdata

```bash
docker run -it --name=spark -h spark -p 9870:9870 -p 8088:8088 -p 9000:9000 ubuntu:20.04

# 이후 내용은 docker container 안에서 작업!
exit
docker start spark
docker exec -it spark bash
```



**base**

```bash
apt update
apt upgrade -y
apt install wget vim -y
apt install openssh-server openssh-client ssh-askpass -y
6 		# Asia
69 		# Seoul

# sshd service 자동 실행
vim ~/.bashrc

# ssh
service ssh start
# 저장

source ~/.bashrc

ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys


# java
wget https://corretto.aws/downloads/latest/amazon-corretto-11-x64-linux-jdk.tar.gz
tar xvzf amazon-corretto-11-x64-linux-jdk.tar.gz 
ln -s amazon-corretto-11.0.16.8.1-linux-x64/ java

# path 설정
vim ~/.bashrc

# java
export JAVA_HOME=/java
export PATH=$PATH:$JAVA_HOME/bin
# 저장

source ~/.bashrc

java -version
javac -version

# python
# ubunut 20 에는 python3.8 이 설치되어 있음
python3 -V
# pip 설치
apt install python3-pip -y
pip -V

# python alias 설정
vim ~/.bashrc

# python
alias python=python3
# 저장

source ~/.bashrc

python -V
python3 -V
pip -V

```



**hadoop**

```bash
# binary로 다운
wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.3/hadoop-3.3.3.tar.gz
tar xvzf hadoop-3.3.3.tar.gz
ln -s hadoop-3.3.3 hadoop

# path
vim ~/.bashrc

# hadoop
export HADOOP_HOME=/hadoop
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export PATH=$PATH:$HADOOP_HOME/bin
export PATH=$PATH:$HADOOP_HOME/sbin

# hadoop user
export HDFS_NAMENODE_USER=root
export HDFS_DATANODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root
# 저장

source ~/.bashrc

cd $HADOOP_CONF_DIR
vim hadoop-env.sh

export JAVA_HOME=/java
export HADOOP_HOME=/hadoop
export HADOOP_CONF_DIR=${HADOOP_HOME}/etc/hadoop
# default가 tmp로 되어있어서 vm 재부팅 시 hadoop 데이터 소실 방지 (198)
export HADOOP_PID_DIR=$HADOOP_HOME/pids
# 저장

```



`vim core-site.xml`

```xml
	<property>
		<name>fs.defaultFS</name>
		<value>hdfs://localhost:9000</value>
	</property>
```



`vim hdfs-site.xml`

```xml
        <property>
                <name>dfs.replication</name>
                <value>1</value>
        </property>
        <property>
                <name>dfs.namenode.name.dir</name>
                <value>/hadoop/namenode_dir</value>
        </property>
        <property>
                <name>dfs.namenode.secondary.http-address</name>
                <value>localhost:50090</value>
        </property>
        <property>
                <name>dfs.datanode.data.dir</name>
                <value>/hadoop/datanode_dir</value>
        </property>
```



`vim mapred-site.xml`

```xml
        <property>
                <name>mapreduce.framework.name</name>
                <value>yarn</value>
        </property>
```



**실행**

```bash
cd /

hdfs namenode -format
hdfs datanode -format

# start-all.sh
start-dfs.sh
start-yarn.sh

# java 기반의 프로세스 확인
jps
# 총 5개 확인 : NameNode, SecondaryNameNode, DataNode, ResourceManager, NodeManager 

hdfs dfsadmin -report
# hadoop http -> localhost:9870
# yarn http -> localhost:8088

# stop-all.sh
stop-dfs.sh
stop-yarn.sh

```



**spark**

```bash
cd /

# download -> pre-built with user-provided... -> 밑에 spark-3.2.2-bin-without-hadoop 링크
wget https://dlcdn.apache.org/spark/spark-3.2.2/spark-3.2.2-bin-without-hadoop.tgz
tar xvzf spark-3.2.2-bin-without-hadoop.tgz
ln -s spark-3.2.2-bin-without-hadoop spark

# 설정
vim ~/.bashrc

# spark
export SPARK_HOME=/spark
export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin
export SPARK_DIST_CLASSPATH=$(${HADOOP_HOME}/bin/hadoop classpath)
# 저장

source ~/.bashrc

cd $SPARK_HOME/conf
cp spark-env.sh.template spark-env.sh
vim spark-env.sh

export JAVA_HOME=/java
export HADOOP_CONF_DIR=/hadoop/etc/hadoop
export YARN_CONF_DIR=/hadoop/etc/hadoop
export SPARK_DIST_CLASSPATH=$(${HADOOP_HOME}/bin/hadoop classpath)

export PYSPARK_PYTHON=/usr/bin/python3
export PYSPARK_DRIVER_PYTHON=/usr/bin/python3
# 저장

cp spark-defaults.conf.template spark-defaults.conf
vim spark-defaults.conf

spark.master						yarn
# 저장

start-all.sh
pyspark

exit()

# 컨테이너에서 빠져나가기
exit

```





### 2. sonatype/nexus3

> 참고 사이트1: https://www.theteams.kr/teams/6045/post/698017
>
> 참고 사이트2: https://dev-youngjun.tistory.com/105

* nexus : 저장 관리자 프로젝트

```bash
docker run -it --name nexus -p 8081:8081 -d sonatype/nexus3

# localhost:8081

docker exec -it nexus bash

# admin
cat nexus-data/admin.password

```





### 3. gitlab (server)

> Git vs GitHub : https://velog.io/@leyuri/Github-%EA%B3%BC-Gitlab-%EC%9D%98-%EC%B0%A8%EC%9D%B4

* gitlab : 비공개된 github

```bash
docker run --name gitlab -it -p 8090:80 -d gitlab/gitlab-ee:latest

# localhost:8090

docker exec -it gitlab bash

# root
cat /etc/gitlab/initial_root_password
# GNUMom+5Fkal7leDGO9Xu6DgXEA/LYAwS7Iks3lsggY=
# 이후에 비밀번호 변경하기!

```





### 4. jenkins

> 참고사이트: https://ict-nroo.tistory.com/31

* jenkins: SW개발 시 지속적으로 통합 서비스(CI)를 제공하는 툴

```bash
docker run --name jenkins -it -p 8080:8080 -d jenkins/jenkins

# localhost:8080

docker exec -it jenkins bash
cat /var/jenkins_home/secrets/initialAdminPassword

```

