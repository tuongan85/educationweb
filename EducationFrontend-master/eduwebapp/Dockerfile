# Sử dụng hình ảnh Node.js
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json /app/ 
# COPY ./eduwebapp/package-lock.json /EducationFrontend/eduwebapp/

# Cài đặt các thư viện cần thiết
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng cho production
RUN chmod -R 777 /app/node_modules
RUN npm run build

# Mở cổng 3000
EXPOSE 3000

# Khởi động ứng dụng
CMD ["npm", "start"]
