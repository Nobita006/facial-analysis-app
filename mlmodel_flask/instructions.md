sudo apt-get update

sudo apt-get install python3 python3-pip git

git clone https://github.com/Nobita006/facialAnalysisBackend.git

cd facialAnalysisBackend

sudo apt install python3-venv

python3 -m venv venv

source venv/bin/activate

pip install flask flask-cors fastai Pillow google-generativeai gunicorn pymongo[srv]

python3 fixModel.py 

python3 app.py

gunicorn --bind 0.0.0.0:8000 app:app





ps aux | grep gunicorn

pkill gunicorn

sudo systemctl restart nginx

sudo systemctl restart gunicorn




sudo nano /etc/systemd/system/gunicorn.service

sudo nano /etc/nginx/sites-available/flaskapp
