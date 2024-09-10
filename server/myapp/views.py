from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests
import json

CONS = {
    "LAUREATES":"laureates",
    "PRIZES":"prizes",
}
PRIZES = {
    "CATEGORY":"category",
    "LAUREATES":"laureates",
    "MOTIVATION":"motivation",
    "OVERALLMOTIVATION":"overallMotivation",
    "YEAR":"year",
    "YEARTO":"yearTo",
    "AFFILIATIONS":"affiliation"
}
CATEGORY = {
    "CHEMISTRY": "chemistry",
    "ECONOMICS": "economics",
    "LITERATURE": "literature",
    "MEDICINE": "medicine",
    "PEACE": "peace",
    "PHYSICS": "physics",
}
LAUREATES = {
    "AFFILIATIONS":"affiliations",
    "BORN":"born",
    "BORNCOUNTRY":"bornCountry",
    "BORNCOUNTRYCODE":"bornCountryCode",
    "BORNCITY": "bornCity",
    "BORNDATE":"bornDate",
    "BORNDATETO":"bornDateTo",
    "DIED":"died",
    "DIEDCITY":"diedCity",
    "DIEDCOUNTRY":"diedCountry",
    "DIEDCOUNTRYCODE":"diedCountryCode",
    "DIEDDATE":"diedDate",
    "DIEDDATETO":"diedDateTo",
    "ID" : "id",
    "KEYWORD":"keyword",
    "GENDER":"gender",
    "MOTIVATION":"motivation",
    "SHARE":"share",
}
AFFILIATIONS = {
    "NAME":"name",
    "CITY":"city",
    "COUNTRY":"country",
}
OTHERS = {
    "FIRSTNAME":"firstname",
    "SURNAME": "surname",
    "KEYWORD": "keyword",
    "ID":"id",
    "IDTO":"idTo",
}
URL = {
    "URL":"https://api.nobelprize.org/v1/",
    "PRIZEJSON":"prize.json",
    "LAUREATEJSON":"laureate.json",
    "COUNTRYJSON":"country.json",
}
# Create your views here.
def writePrizes(year, category, overallmotivation, laureates=[]):
    return {
        "year": str(year),
        "category": str(category),
        "overallMotivation": str(overallmotivation),
        "laureates": list(laureates),
    }

def writePrizesLaureates(id, firstname, surname, motivation, share):
    return {
        "id":str(id),
        "firstname":str(firstname),
        "surname":str(surname),
        "motivation":str(motivation),
        "share":str(share),
    }

def writeLaureates(id,firstname,surname,born,died,borncountry,borncountrycode,borncity,diedcountry,diedcountrycode,diedcity,gender,prizes=[]):
    return {
        "id":str(id),
        "firstname":str(firstname),
        "surname":str(surname),
        "born":str(born),
        "died":str(died),
        "bornCountry":str(borncountry),
        "bornCountryCode":str(borncountrycode),
        "bornCity":str(borncity),
        "diedCountry":str(diedcountry),
        "diedCountryCode":str(diedcountrycode),
        "diedCity":str(diedcity),
        "gender":str(gender),
        "prizes":list(prizes),
    }

def writeLaureatesPrizes(year,category,share,motivation,affiliations=[]):
    return {
        "year":str(year),
        "category":str(category),
        "share":str(share),
        "motivation":str(motivation),
        "affiliations":list(affiliations),
    }

def writeLaureatesPrizesAffiliations(name,city,country):
    return {
        "name":str(name),
        "city":str(city),
        "country":str(country),
    }

def destructing(my_dict, *keys):
    return [my_dict[k] if k in my_dict else None for k in keys]
    

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
    payload = request.data
    if (payload):
        print("payload",payload, dict(payload))
        query_prize = ["year", "yearTo", "category"]
        query_laureates = ["city","country","affiliation", "keyword"]
        query_others = ["firstname", "surname","id", "idTo"]
        result = {
            "prizes":[]
        }
        ids_group = []
        prizesquery = []
        laureatesquery = []
        othersquery = []
        char = "&"
        url = "https://api.nobelprize.org/v1/"
        prizesjson = "prize.json"
        laureatesjson = "laureate.json"
        
        for key in dict(payload):
            # bug: empty value should make list empty
            if key in query_prize:
                prizesquery.append(f"{key}={payload[key]}")
                
            elif key in query_laureates:
                laureatesquery.append(f"{key}={payload[key]}")
                
            elif key in query_others:
                othersquery.append(key)
                
        print("prizesquery:",prizesquery)
        print("laureatesquery:",laureatesquery)
        print("othersquery:",othersquery)
        
        if prizesquery:
            response = requests.get(f"{url}{prizesjson}?{char.join(prizesquery)}")
            status = response.status_code
            if not laureatesquery and not othersquery:
                return Response(response.json())
            elif othersquery and not laureatesquery:
                try:
                    data = response.json()
                    datalist = data.keys()
                    print("data keys: ", datalist)
                    if "prizes" in datalist and len(data["prizes"]):
                        print("prizes length:",len(data["prizes"]))
                        for item in data["prizes"]:
                            itemlist = item.keys()
                            if "laureates" in itemlist and len(item["laureates"]):
                                year=item["year"]
                                category=item["category"]
                                overallmotivation = ""
                                if "overallMotivation" in itemlist:
                                    overallmotivation = item["overallMotivation"]
                                #laureates = []
                                if "laureates" in itemlist and len(item["laureates"]):
                                    for laur in item["laureates"]:
                                        laurlist = laur.keys()
                                        id = laur["id"]
                                        firstname = laur["firstname"]
                                        surname = ""
                                        if "surname" in laurlist:
                                            surname = laur["surname"]
                                        motivation = laur["motivation"]
                                        share = laur["share"]
                                        
                                        testpass = 0
                                        for ele in othersquery:
                                            if payload[ele] == laur[ele]:
                                                testpass += 1
                                        if testpass == len(othersquery):
                                            temp = {
                                                "id":id,
                                                "firstname":firstname,
                                                "surname": surname,
                                                "motivation":motivation,
                                                "share":share,
                                            }
                                            result["prizes"].append(
                                                {
                                                    "year":year,
                                                    "category":category,
                                                    "overallMotivation":overallmotivation,
                                                    "laureates":[temp]
                                                }
                                            )
                        return Response(result)                    
                                
                    else: 
                        return Response(result)
                except Exception as e:
                    return Response({
                        "message":"[o]prizes [o]others [x]laureates", 
                        "error":str(e),
                        "status":status
                        })
                
            # elif laureatesquery and not othersquery:

            # elif laureatesquery and othersquery:
        
        # elif not prizesquery:
            
            # if not laureatesquery and not othersquery:
                # return Response({"error": "payload and official page query not matching or no payload matches found"})    
            
            # elif not laureatesquery and othersquery:
            
            # elif laureatesquery and othersquery:   

            
        return Response({"message":"You have provided non prize query search", "payload":str(request.data),"request":str(request)})

    return Response({
                    "message" : "payload has error or empty",
                    "payload" : str(request.data),
                    "request" : str(request),
                    })