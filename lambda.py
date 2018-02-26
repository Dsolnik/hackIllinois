import boto3
import json
import base64

def lambda_handler(event, context):
    #return (event)
    print (event)
    t=json.dumps(event)
    i=json.loads(t)
    f=(i["data"])
    b=f[23:]
    
    buf=bytearray(base64.urlsafe_b64decode(b))
    client = boto3.client('rekognition')
    response = client.detect_labels(

    Image= {
        'Bytes': buf
        
        },
    
    MaxLabels=123,
    MinConfidence=70,
    )
    r=json.dumps(response)
    j=json.loads(r)
    #return (response)
    
    o= j['Labels']
    for i in o:
        if (i['Name']=='Person'):
            return ("An intruder is in the home")
        #else:
            #return ("No intruder in the home")
         
    
