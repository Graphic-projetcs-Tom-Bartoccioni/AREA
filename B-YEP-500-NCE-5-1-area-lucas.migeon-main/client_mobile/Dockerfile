FROM cirrusci/flutter

WORKDIR /app

COPY . .

RUN flutter pub get

RUN flutter build apk 

RUN mkdir /data /data/apk

RUN mv ./build/app/outputs/flutter-apk/app-release.apk /data/apk/client.apk
