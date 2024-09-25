python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install zappa boto3 
zappa deploy dev
