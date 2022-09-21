# ubuntu on docker

>  참고사이트: https://velog.io/@peeeeeter_j/Docker%EC%97%90%EC%84%9C-Ubuntu-20.04-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

```shell
docker run -it --name ubuntu ubuntu
apt update
```

* sudo 안먹힐 때

> https://typo.tistory.com/entry/Docker-bash-sudo-command-not-found

```shell
apt-get update && apt-get -y install sudo
```

* WSL 환경에서는 systemctl 안먹힘

```shell
# service
sudo service postgresql start
sudo -i -u postgres
psql
```

* ubuntu 에 postgresql 깔기

  > https://ko.linuxcapable.com/how-to-install-and-configure-postgresql-on-ubuntu-20-04/