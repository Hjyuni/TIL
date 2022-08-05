# syntax=docker/dockerfile:1
FROM python:3.9-slim-buster
EXPOSE 8501
WORKDIR /app
RUN pip install streamlit
COPY . .
CMD ["streamlit", "run", "app.py"]