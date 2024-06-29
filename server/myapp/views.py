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
    pass