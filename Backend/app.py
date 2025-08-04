# from mainpg import FetchData
from flask import Flask, request, jsonify,render_template,url_for
from flask_cors import CORS
import os
import random
from pymongo import MongoClient
import datetime
client=MongoClient('mongodb+srv://muskantarafder357:Kissan123@cluster0.ktn6z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db=client['InternData']

class FetchData:
    def __init__(self):
        self.access=db['Info']
        self.dict1={}
    def GetData(self):
        res=self.access.find({},{'_id':0,'createdAt':0}).sort('createdAt',-1)
        self.dict1=res[0]
        return res[0]
    def GetCount(self):
        res=self.access.find({},{'referal':1,'_id':0}).sort('createdAt',-1)
        print(res[0])
        newref=str(int(res[0]['referal'])+1)
        while len(newref)<4:
            newref='0'+newref
        return newref
    def addData(self,data):
        data['amt']=random.randint(100,1000)
        data['createdAt'] = datetime.datetime.utcnow()
        result = self.access.insert_one(data)
        return True
base_dir = os.path.abspath(os.path.dirname(__file__))

# Go up one level and enter Frontend/
frontend_dir = os.path.abspath(os.path.join(base_dir, '..', 'Frontend'))

# Set template and static directories
template_dir = os.path.join(frontend_dir, 'templates')
static_dir = os.path.join(frontend_dir, 'static')


app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)
CORS(app) 

holder=FetchData()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Dashboard')
def Dashboard():
    return render_template('dashboard.html')

@app.route('/ShowData')
def ShowData():
   result=holder.GetData()
   return jsonify(result)

@app.route('/Rewards')
def Rewards():
    result=holder.dict1['rewards']
    
    if result==[]:
        result=['dummy1','dummy2','dummy3']
    data={'Rewards':result}
    return jsonify(data)

@app.route('/newUser',methods=['POST'])
def newUser():
    data=request.json
    newref=holder.GetCount()
    name=data.get('name')
    data['referal']=newref
    if (" " in name):
        splitname=name.split(' ')
        data['name']=splitname[0]
        data['lastname']=splitname[1]
    else:
        data['lastname']=''
    cond=holder.addData(data)
    if cond:
        msg='Dummy User Taken.Proceed with Login'
    else:
        msg='Some error Occured'
    return jsonify({'message':msg})


app.run(debug=True)
# mm=FetchData()
# print(mm.dict1)
# print(mm.GetData())
# print(mm.dict1['rewards'])