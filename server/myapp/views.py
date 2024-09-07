from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests


# Create your views here.

# @require_http_methods(['GET'])
@api_view(['GET'])
def hello_world(request):
    data = [
            {'message':'Hello, world!'},{'message':'Edge of Tomorrow World!'}
            ]
    #return JsonResponse(
    return Response(
        data 
        #safe=False
        )

@api_view(['GET'])
def get_allPrizes(request):
    response = requests.get('https://api.nobelprize.org/v1/prize.json')
    return Response(response.json())

@api_view(['GET'])
def get_allLaureate(request):
    response = requests.get('https://api.nobelprize.org/v1/laureate.json')
    return Response(response.json())

@api_view(['GET'])
def get_allCountries(request):
    response = requests.get('https://api.nobelprize.org/v1/country.json')
    return Response(response.json())

@api_view(['POST'])
def get_randomWinner(request):
    payload = request.data
    if payload:
        text = []
        char = "&"
        for key in payload:
            text.append(f"{key}={payload[key]}")
        response = requests.get(f"https://api.nobelprize.org/v1/prize.json?{char.join(text)}")
        return Response(response.json())
    message = {
        "message" : "payload is empty",
        "payload" : str(request.data),
        "request" : str(request)
    }
    return Response(message)

@api_view(['POST'])
def searchofficial(request):
    message = [
        "No search data avaliable",
        "Search subject not found",
        ""
    ]
    payload = request.data
    if (payload):
        query_prize = ["year", "yearTo", "category"]
        query_laureates = ["city","country","affiliation"]
        query_others = ["firstname", "surname", "keyword", "id", "idTo"]
        my_dict = {}
        text = []
        char = "&"
        for key in payload:
            if key in query_prize:
                text.append(f"{key}={payload[key]}")
        response = requests.get(f"https://api.nobelprize.org/v1/prize.json?{char.join(text)}")
        return Response(response.json())
        #return Response({"payload" : str(payload),"keys": str([{str(i):str(payload[i])} for i in payload if i in query_prize] + [{str(j):str(payload[j])} for j in payload if j in query_laureates] + [k for k in payload if k in query_others])})
    return Response({"message": str(f"payload empty: {message[0]}")})