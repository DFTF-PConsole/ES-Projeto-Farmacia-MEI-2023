import json
import random
import time
from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Drug
import jwt
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import boto3
import pdb
import botocore.session
from rest_framework.decorators import api_view

from botocore.exceptions import BotoCoreError
from django.shortcuts import render


def react(request):
    return render(request, "index.html")

@api_view(['GET'])
def getExecutions(request):
    stepfunctions = boto3.client('stepfunctions', region_name='us-west-2')

    response = stepfunctions.list_executions(
        stateMachineArn='arn:aws:states:us-west-2:834485211981:stateMachine:MyStateMachine'
    )

    executions = []

    for execution in response['executions']:
        execution_arn = execution['executionArn']
        execution_status = execution['status']
        
        execution_stop_date = str(execution['stopDate']) if 'stopDate' in execution else str(execution['startDate'])

        input_response = stepfunctions.describe_execution(
            executionArn=execution_arn
        )

        execution_input = input_response.get('input', '')

        execution_data = {
            'status': execution_status,
            'stopDate': execution_stop_date,
            'input': execution_input,
        }

        executions.append(execution_data)

    return JsonResponse(executions, safe=False)

@api_view(['POST'])
@csrf_exempt
def startExecution(request):
    data = json.loads(request.body)
    cartItems = data.get('cartItems')
    totalPrice = data.get('totalPrice')
    
    stepfunctions = boto3.client('stepfunctions', region_name='us-west-2')

    input = {}

    for i, drug in enumerate(cartItems, start=1):
        input[f"drug{i}"] = drug['name']

    input["totalPrice"] = totalPrice
    response = stepfunctions.start_execution(
        stateMachineArn='arn:aws:states:us-west-2:834485211981:stateMachine:MyStateMachine',
        input=json.dumps(input)
    )
    
    return HttpResponse(f'Step Functions execution started: {response}')

@api_view(['GET'])
def create_drugs(request):
    drug_names = {
        "Aspirin": ["Acetylsalicylic Acid"],
        "Paracetamol": ["Acetaminophen"],
        "Ibuprofen": ["Advil", "Motrin"],
        "Amoxicillin": ["Penicillin", "Augmentin"],
        "Lisinopril": ["Prinivil", "Zestril"],
        "Atorvastatin": ["Lipitor"],
        "Metformin": ["Glucophage"],
        "Omeprazole": ["Prilosec"],
        "Simvastatin": ["Zocor"],
        "Azithromycin": ["Zithromax"],
        "Ciprofloxacin": ["Cipro"],
        "Fluoxetine": ["Prozac"],
        "Escitalopram": ["Lexapro"],
        "Sertraline": ["Zoloft"],
        "Tramadol": ["Ultram"],
        "Warfarin": ["Coumadin"],
        "Prednisone": ["Deltasone"],
        "Metoprolol": ["Lopressor", "Toprol-XL"],
        "Gabapentin": ["Neurontin"],
        "Amlodipine": ["Norvasc"],
    }

    manufacturers = ['Manufacturer X', 'Manufacturer Y', 'Manufacturer Z']
    max_price = 20.00
    max_quantity = 100

    drugs = []
    drugsUsed = []
    for i in range(random.randint(1, 5)): 
        n = random.choice(list(drug_names.keys()))
        
        
        if n not in drugsUsed:
            drugsUsed.append(n)
            drug = Drug(
                name=n,
                manufacturer=random.choice(manufacturers),
                price= round(random.uniform(1.00, max_price),2),
                quantity=random.randint(1, max_quantity)
            )
            alt=[]
            for e in range(len(drug_names[n])):
                drugAlt = Drug(
                    name=drug_names[n][e],
                    manufacturer=random.choice(manufacturers),
                    price= round(random.uniform(1.00, max_price),2),
                    quantity=random.randint(1, max_quantity)
                    )
                alt.append(model_to_dict(drugAlt))
    
            drug.alternatives = alt
            drugs.append(drug)
    print(drugsUsed)


    drug_list = [model_to_dict(drug) for drug in drugs]
    return JsonResponse(drug_list, safe=False)

@api_view(['POST'])
@csrf_exempt
def login(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username == 'user' and password == 'password':

        token = jwt.encode({'username': username}, settings.SECRET_KEY, algorithm='HS256')

        return JsonResponse({'token': token})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=401)

def validateSessionToken(token):
    try:

        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            
        return True
    except jwt.ExpiredSignatureError:

        return False
    except jwt.InvalidTokenError:

        return False
    
@api_view(['GET'])
def validateSession(request):
    
    token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]

    if validateSessionToken(token):

        return JsonResponse({'message': 'Authorized'})
    else:

        return JsonResponse({'message': 'Unauthorized'}, status=401)

