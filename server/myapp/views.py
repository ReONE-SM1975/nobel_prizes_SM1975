from django.shortcuts import render
from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods

# Create your views here.

# @require_http_methods(['GET'])
def hello_world(request):
    data = list([{'message':'Hello, world!'},{'message':'Edge of Tomorrow World!'}])
    return JsonResponse(data, safe=False)