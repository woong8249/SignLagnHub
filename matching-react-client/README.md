# Docker push process

[Docker Hub Repository](https://hub.docker.com/repository/docker/jiwoong8249/sign-lang-hub-booking/general)

```zsh
docker login
```

``` zsh
docker build -t sign-lang-hub-booking:tagName .
```

``` zsh
docker tag sign-lang-hub-booking:tagName jiwoong8249/sign-lang-hub-booking:latest
```

``` zsh
docker push jiwoong8249/sign-lang-hub-booking:latest
```

### Ref

- 로컬에서 빌드 및 테스트

  1. 로컬에서 다양한 태그로 이미지를 빌드하고 테스트.

  ```zsh
  docker build -t my-app:experimental .
  docker build -t my-app:v1.0.0 .
  ```
  2. 테스트 후, 안정적인 버전을 리모트에 푸시.


  ``` zsh
  docker tag my-app:v1.0.0 myusername/my-app:v1.0.0
  docker push myusername/my-app:v1.0.0
  ```
  
- 리모트는 배포를 위한 태그 관리

  리모트에는 주로 안정적인 버전(e.g., v1.0.0, latest)만 업로드하여 배포 환경에서 사용할 수 있도록 합니다.