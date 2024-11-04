#FROM python:3.9-slim
#LABEL authors="PC"
#ENTRYPOINT ["top", "-b"]
# Sử dụng hình ảnh cơ bản của Python
FROM python:3.9-slim

# Cài đặt các gói phụ thuộc
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép mã nguồn vào container
COPY . /app

# Thiết lập biến môi trường Django
ENV PYTHONUNBUFFERED=1

# Chạy lệnh khởi chạy server Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
