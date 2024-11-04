# Sử dụng hình ảnh Node.js
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và cài đặt các thư viện
COPY package*.json /app/
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . /app

# Xây dựng ứng dụng cho production
RUN npm run build

# Expose port (tùy chọn, nếu bạn muốn chạy trực tiếp từ Node server)
EXPOSE 3000

# Lệnh khởi động server (có thể thay đổi tùy vào yêu cầu)
CMD ["npm", "start"]
