# Docker_Hadoop_Spark

**docker**

Dashboard -> Preferences -> Resources -> CPUs, Memory, Swap 적당히 올려주기

`docker run -it --name=spark ubuntu:20.04`



**기본 설정**

```terminal
apt update
apt upgrade -y
apt install vim -y
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
ln -s amazon-corretto-11.0.15.9.1-linux-x64/ java

# path
vim ~/.bashrc

# java
export JAVA_HOME=/java
export PATH=$PATH:$JAVA_HOME/bin
# 저장

source ~/.bashrc

java -version
javac -version

# python
# ubuntu 20 에 python3.8 이미 설치되어 있음
python3 -V

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

```terminal
wget https://dlcdn.apache.org/hadoop/common/hadoop-3.3.3/hadoop-3.3.3.tar.gz
tar xvzf hadoop-3.3.3.tar.gz
ln -s hadoop-3.3.3/ hadoop

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

# directory 생성
mkdir /hadoop/temp
mkdir /hadoop/pids
mkdir /hadoop/namenode_dir
mkdir /hadoop/secondary_dir
mkdir /hadoop/datanode_dir
mkdir /hadoop/logs
mkdir -p /hadoop/yarn/logs
mkdir -p /hadoop/yarn/local

# 설정
cd $HADOOP_CONF_DIR
vim hadoop-env.sh

export JAVA_HOME=/java
export HADOOP_HOME=/hadoop
export HADOOP_CONF_DIR=${HADOOP_HOME}/etc/hadoop
export HADOOP_PID_DIR=${HADOOP_HOME}/pids
# 저장

# hadoop master - slaver 설정
vim master

master
# 저장

vim workers
# localhost 삭제
slave1
slave2
slave3
# 저장
```



`vim core-site.xml`

```xml
        <property>
                <name>fs.defaultFS</name>
                <value>hdfs://master:9000</value>
        </property>
        <property>
                <name>hadoop.tmp.dir</name>
                <value>/hadoop/temp</value>
        </property>
```

`vim hdfs-site.xml`

```xml
        <property>
                <name>dfs.replication</name>
                <value>2</value>
        </property>
        <property>
                <name>dfs.namenode.name.dir</name>
                <value>/hadoop/namenode_dir</value>
        </property>
        <property>
                <name>dfs.namenode.checkpoint.dir</name>
                <value>/hadoop/secondary_dir</value>
        </property>
        <property>
                <name>dfs.datanode.data.dir</name>
                <value>/hadoop/datanode_dir</value>
        </property>
        <property>
                <name>dfs.namenode.secondary.http-address</name>
                <value>slave1:9868</value>
        </property>
```

`vim mapred-site.xml`

```xml
        <property>
                <name>mapreduce.framework.name</name>
                <value>yarn</value>
        </property>
```

`vim yarn-site.xml`

```xml
        <property>
                <name>yarn.resourcemanager.hostname</name>
                <value>master</value>
        </property>
        <property>
                <name>yarn.nodemanager.log-dirs</name>
                <value>file:///hadoop/yarn/logs</value>
        </property>
        <property>
                <name>yarn.nodemanager.local-dirs</name>
                <value>file:///hadoop/yarn/local</value>
        </property>
```



**spark**

```terminal
cd /

# hadoop이 설치되어 있으므로, Pre-built with user-provided Apache Hadoop 선택
wget https://dlcdn.apache.org/spark/spark-3.2.1/spark-3.2.1-bin-without-hadoop.tgz
tar xvzf spark-3.2.1-bin-without-hadoop.tgz
ln -s spark-3.2.1-bin-without-hadoop/ spark

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

# spark master - slave 설정
cp workers.template workers
vim workers
# localhost 삭제
slave1
slave2
slave3
# 저장
```



**container 생성**

```terminal
exit

# 위에서 만든 spark를 image로 저장
docker commit spark spark

docker run -it -h master --name master -p 9870:9870 -p 8088:8088 -p 9864:9864 spark
exit
docker start master

docker run -it -h slave1 --name slave1 --link master:master spark
exit
docker start slave1

docker run -it -h slave2 --name slave2 --link master:master spark
exit
docker start slave2

docker run -it -h slave3 --name slave3 --link master:master spark
exit
docker start slave3

# node 연결 시 IPAddress 확인 필!
# window
docker inspect master | find "IPAddress"
docker inspect slave1 | find "IPAddress"
docker inspect slave2 | find "IPAddress"
docker inspect slave3 | find "IPAddress"

# linux / mac
docker inspect master | grep IPAddress
docker inspect slave1 | grep IPAddress
docker inspect slave2 | grep IPAddress
docker inspect slave3 | grep IPAddress


# master - slave node 연결
docker exec -it master bash

vim /etc/hosts

172.17.0.2	master
172.17.0.3	slave1
172.17.0.4	slave2
172.17.0.5	slave3
# 저장

# 연결 확인 (ssh 통신)
ssh slave1
yes
exit

ssh slave2
yes
exit

ssh slave3
yes
exit
```



**실행**

```terminal
hdfs namenode -format
hdfs datanode -format

start-dfs.sh
start-yarn.sh

hdfs dfsadmin -report
# Live datanodes (3) 이어야 함!

# hadoop web
# localhost:9870

# yarn web
# localhost:8088

pyspark

# test
df = spark.range(1000).toDF('number')
df.show()
df.write.format('csv').mode('overwrite').save('/numbers')

exit()

# test 데이터 확인
hdfs dfs -ls /numbers
hdfs dfs -cat /numbers/part-*.csv

# host에서 docker 에 파일 전달 방법
# docker cp 호스트파일경로 master:/

# hadoop file upload 방법
# hdfs dfs -put {업로드 할 파일} {저장할 하둡 경로}
```

