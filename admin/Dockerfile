FROM python:3.9

COPY requirements.txt .

RUN pip install -r requirements.txt

# 6379 -> deafult redis server port
EXPOSE 6379

COPY . .

CMD ["python", "admin_cli.py"]