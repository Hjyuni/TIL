# ubuntu 체제로 바꾸기

## 1) ubuntu 다운로드

> 참고사이트: https://recipes4dev.tistory.com/112

1. USB 꽂은 상태로 전원 켜지자마자 `F2` or `del`키 연타
2. 설정 : https://m.blog.naver.com/pcmedic9119/220588093035
3. ⭐installation 페이지 : erase disk and install ubuntu 선택, 언어 영어로 설정
4. 설치 후 restart 나오면 **USB제거 후** reboot

5. update&upgrade 하기

```shell
$ sudo apt update && sudo apt upgrade -y
```

---

## 2) timezone 설정

```shell
# 현재 설정돼있는 시간 확인
$ date
# or
$ timedatectl
# 방법1
$ timedatectl list-timezones | grep Seoul
$ sudo timedatectl set-timezone Asia/Seoul
# 방법2
$ ls -l /etc/localtime
$ sudo rm -rf /etc/localtime
$ sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
```

---

## 3) discord 다운로드

```shell
# deb 다운
$ wget -O ~/discord.deb "https://discordapp.com/api/download?platform=linux&format=deb"

# 설치방법1
$ sudo apt install ./discord.deb -y
-----
# 설치방법2
$ sudo gdebi ~/discord.deb
```

---

## 4) 한글 자판 설정

```shell
$ sudo apt-get update
$ sudo apt-get install fcitx-hangul

우분투 세팅 -> Region & Language -> Manage Installed Languages 맨아래 keyboard input method system -> fcitx 선택

$ sudo reboot (재부팅)

화면상단에 저 키보드 클릭 -> configure -> 맨 아래 '+' 클릭 -> only show 클릭 해제하고 search에서 hangul 검색 & 추가 -> 위에 global config -> trigger input method 누르고 한영키 -> addon -> quickphrase 더블클릭 trigger 어쩌고 None

다시 global config 맨아래 show advanced -> apperance 맨위에 체크해제 3번째 체크해제

한영키 ralt로 인식될때 cd /usr/share/X11/xkb/symbols

$ sudo vi altwin

이케 수정
xkb_symbols "meta_alt" {    
 	key <LALT> { [ Alt_L, Meta_L ] };   
 	key <RALT> { type[Group1] = "TWO_LEVEL",                 
     			 symbols[Group1] = [ Hangul ] };     
 modifier_map Mod1 { Alt_L, Alt_R, Meta_L, Meta_R };
 modifier_map Mod4 {};}
 }
```

---

## 5) typora 설치

```shell
# or run:
# sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
>>> wget -qO - https://typora.io/linux/public-key.asc | sudo tee /etc/apt/trusted.gpg.d/typora.asc
# add Typora's repository
>>> sudo add-apt-repository 'deb https://typora.io/linux ./'
>>> sudo apt update
# install typora
>>> sudo apt install typora
```

---

## 6) chrome 설치

```shell
>>> wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

>>> sudo apt install ./google-chrome-stable_current_amd64.deb
```

---

## 7) VS Code 설치

> 공식사이트(deb파일) : https://code.visualstudio.com/
>
> 참고사이트: https://mryeo.tistory.com/16

```shell
# .deb 파일 다운 받은 후
>>> cd Downloads
>>> sudo apt install ./code (tab키)
```

---

## 8) cascadia 글씨체 다운

> https://github.com/microsoft/cascadia-code/releases

1. 위 사이트에서 tar.gz 다운받기

2. Downloads(폴더) 들어가서 extract하기
3. sources -> vtt_data 들어가서 글씨체 두 개 다 다운받기

4. ```shell
   >>> sudo apt install gnome-tweaks
   ```

5. Utilities -> Tweaks -> Fonts

   * Interface Text, Document Text, Monospace Text, Legacy Window Titles 를 전부 다 cascadia semibold italic으로 바꾸기 

---

## 9)vsc에 cascadia-code 글씨체 다운받기

* vsc들어가기

  * settings -> font family 

    ```python
    'Cascadia Code', consolas, 'Courier New', monospace
    ```

  * search bar-> Font Ligatures 검색 

    ```json
    # Edit in settings.json
    {
        "editor.fontSize": 13,
        "editor.fontFamily": "'Cascadia Code', consolas, 'Courier New', monospace",
        "editor.fontLigatures": "'ss02', 'ss19'",
        "workbench.colorTheme": "Monokai Pro (Filter Octagon)",
        "workbench.iconTheme": "Monokai Pro (Filter Octagon) Icons"
    }
    ```

* 글씨체 옵션: [How to enable stylistic sets · tonsky/FiraCode Wiki · GitHub](https://github.com/tonsky/FiraCode/wiki/How-to-enable-stylistic-sets)