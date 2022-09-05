# settings

1. net-tools

```shell
> sudo apt update && sudo apt upgrade -y
> sudo apt install net-tools
# check
> ifconfig
```

2. openssh-server

```shell
> sudo apt install openssh-server
# open firewall (port:22)
> sudo ufw allow ssh
> sudo ufw enable
```

3. git

```shell
> sudo apt install git
> git --version
```

4. node (nvm)

> * https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/

```shell
> sudo apt install curl
> curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
> source ~/.bashrc
# download lts version
# or
# nvm install [version] : nvm install 16.16.0
> nvm install node
# check
> nvm ls
> nvm run default --version
```

5. nginx

> * https://t-okk.tistory.com/154

```shell
> sudo apt update && sudo apt upgrade -y
> sudo apt autoremove
> sudo apt install nginx
> sudo systemctl start nginx
> sudo systemctl status nginx
# check
# localhost
> netstat -nlpt
```

6. java

> * https://mech2cs.tistory.com/entry/Ubuntu-2004-%EC%9E%90%EB%B0%94-JDK-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EB%B2%84%EC%A0%84-%EA%B4%80%EB%A6%AC

```shell
> sudo apt update && sudo apt upgrade -y
> sudo apt install openjdk-8-jdk
> sudo vim ~/.bashrc
####
export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
# :wq!
> source ~/.bashrc
> java -version
> update-alternatives --list java
```

7. docker

```shell
> sudo apt-get install \
ca-certificates \
curl \
gnupg \
lsb-release
> curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
> sudo apt-key fingerprint 0EBFCD88
> echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
> sudo apt-get update
> sudo apt-get install docker-ce docker-ce-cli containerd.io
> sudo usermod -aG docker $USER
# check
> docker --version
```

8. mysql

```shell
> sudo apt update && sudo apt upgrade -y
> sudo apt install mysql-server
> sudo /usr/bin/mysql -u root -p
```

