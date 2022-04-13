FROM node:16.12 AS build-step
LABEL authors="Felipe Celsi"
ARG ENV_BUILD=dev
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
RUN ng build -c $ENV_BUILD

FROM nginx:latest AS prod-step
COPY --from=build-step /app/dist/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]