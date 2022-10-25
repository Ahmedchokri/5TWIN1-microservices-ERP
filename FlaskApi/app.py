
from flask_cors import CORS
from flask import Flask , request ,flash, jsonify , make_response,send_from_directory,send_from_directory,send_file
from flask_pymongo import PyMongo
from flask_restful import Api , Resource
import base64
from pyresparser import ResumeParser
import os

import urllib.request
import py_eureka_client.eureka_client as eureka_client



import nltk

stopwords = nltk.corpus.stopwords.words('english')
import spacy
nlp = spacy.load('en_core_web_sm')

UPLOAD_FOLDER = r'/var/lib'
ALLOWED_EXTENSIONS = {'docx', 'pdf'}

app = Flask(__name__)


your_rest_server_port = 5000
# The flowing code will register your server to eureka server and also start to send heartbeat every 30 seconds
eureka_client.init(eureka_server="http://eureka-service:8761/eureka/",
                   app_name="flaskmicroservice",
                   instance_port=your_rest_server_port)
api = Api(app)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["MONGO_URI"] = "mongodb://mongo:27017/KriptonCRM"
mongodb_client = PyMongo(app)
app.secret_key = "super secret key"
db = mongodb_client.db
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def show_pdf(file_path):
    with open(file_path, "rb") as f:
        resume_data = ResumeParser(file_path).get_extracted_data()

    f.close()
    os.remove(file_path)
    return resume_data
class addpdf(Resource):
    def post(self):
        if request.is_json:
            pdfurl=request.json['pdf']
           # get_url = urllib.request.urlopen(pdfurl)
            #resume_data = ResumeParser(sl).get_extracted_data()
            return(show_pdf(pdfurl))

        else:
            return {'error': 'Request must be JSON'}, 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

@app.route('/template/flask', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
        file = request.files['file']
        print(file.stream)
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
        if file and allowed_file(file.filename):
            print(UPLOAD_FOLDER + r"//" + file.filename)


            # return redirect(url_for('uploaded_file',
            # filename=filename))
            print(file)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'],file.filename))
            filetosend = UPLOAD_FOLDER + r"/" + file.filename
            print(filetosend)
            datafile = open(filetosend, 'rb')
            pdfdatab = datafile.read()  # this is binary data
            datafile.close()

            b64PDF =  base64.b64encode(pdfdatab)
            id = db.photos.insert_one({'image':b64PDF})
            return {"id" : str(id.inserted_id),"data": show_pdf(filetosend)}
    else:
        return "true";
if __name__ == '__main__':
    app.run()