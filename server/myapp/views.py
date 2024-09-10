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
    "OVERALLMOTIVATION":"overallmotivation",
    "YEAR":"year",
    "YEARTO":"yearTo",
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
    "AFFILIATION":"affiliation",
    "BORNCOUNTRY":"bornCountry",
    "BORNCITY": "bornCity",
    "BORNDATE":"bornDate",
    "BORNDATETO":"bornDateTo",
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
OTHERS = {
    "FIRSTNAME":"firstname",
    "SURNAME": "surname",
    "KEYWORD": "keyword",
    "ID":"id",
    "IDTO":"idTo"
}
URL = {
    "URL":"https://api.nobelprize.org/v1/",
    "PRIZEJSON":"prize.json",
    "LAUREATEJSON":"laureate.json",
    "COUNTRYJSON":"country.json"
}
# Create your views here.
def writePrizes(year, category, overallmotivation, laureates=[]):
    return {
        "year": str(year),
        "category": str(category),
        "overallmotivation": str(overallmotivation),
        "laureates": list(laureates)
    }

def writePrizesLaureates(id, firstname, surname, motivation, share):
    return {
        "id":str(id),
        "firstname":str(firstname),
        "surname":str(surname),
        "motivation":str(motivation),
        "share":str(share)
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
    message = [
        "No search data avaliable",
        "Search subject not found",
        ""
    ]
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
        # countryjson = "country.json"
        for key in dict(payload):
            if key in query_prize:
                prizesquery.append(f"{key}={payload[key]}")
                
            elif key in query_laureates:
                laureatesquery.append(f"{key}={payload[key]}")
                
            elif key in query_others:
                othersquery.append(key)
                
        print("prizesquery:",prizesquery)
        print("laureatesquery:",laureatesquery)
        print("othersquery:",othersquery)
        # if prizesquery and not laureatesquery and not othersquery:
        if prizesquery:
            response = requests.get(f"{url}{prizesjson}?{char.join(prizesquery)}")
            status = response.status_code
            if not laureatesquery and not othersquery:
                return Response(response.json())
            elif othersquery and not laureatesquery:
                # data = json.loads(str(response.json()))
                data = response.json()
                datalist = data.keys()
                # laureateslist = data["prizes"][0]["laureates"].keys()
                print("data keys: ", datalist)
                # if data["prizes"] and data["prizes"][0]["laureates"]:
                #if "prizes" in datalist:
                if data["prizes"] and data["prizes"][0]["laureates"]:
                    prizes = data["prizes"]
                    prizesIdx = 0
                    for ele in prizes:
                        elelist = ele.keys()
                        print(f"data.prizes[{prizesIdx}]",elelist)
                        prizesIdx += 1
                        year = ele["year"]
                        category = ele["category"]
                        # if ele["overallmotivation"]:
                        #     overallmotivation = ele["overallmotivation"]
                        # else:
                        #     overallmotivation = ""
                        overallmotivation = ""
                        if "overallmotivation" in elelist:
                            overallmotivation = ele["overallmotivation"]
                        laureates = []
                        prizestemp = {
                            "year":year,
                            "category":category,
                            "overallmotivation":overallmotivation,
                            "laureates":laureates
                        }
                        if "laureates" in elelist:
                            count = 0
                            for laureate in ele["laureates"]:
                                laureatelist = laureate.keys()
                                print(f"laureates[{count}]",laureatelist)
                                id = laureate["id"]
                                firstname = laureate["firstname"]
                                surname = ""
                                if "surname" in laureatelist:
                                    surname = laureate["surname"]
                                motivation = laureate["motivation"]
                                share = laureate["share"]
                                laureatestemp = {
                                    "id": id,
                                    "firstname":firstname,
                                    "surname":surname,
                                    "motivation":motivation,
                                    "share":share
                                }
                                groups = []
                                count += 1
                                for key in othersquery:
                                    if laureate[key] == payload[key]:
                                        groups.append(laureatestemp)
                                if groups:
                                    prizestemp['laureates'] = groups
                                    result["prizes"].append(prizestemp) 
                                    #result["prizes"][0]['laureates'] = groups
                                    
                                
                        else:
                            result["prizes"].append(
                                {
                                    "year":year,
                                    "category":category,
                                    "overallmotivation":overallmotivation,
                                    "laureates":laureates
                                    }
                            )
                    return Response(result)
                elif not data["prizes"][0]["laureates"]:
                    return Response(data)
                
                else:
                    return Response({"error":"response incorrect or variable incorrect represented or codes has fault needed to be resorted","status_code":status,"data":data, "payload":payload})
            # elif laureatesquery and not othersquery:

            # elif laureatesquery and othersquery:
        
        # elif not prizesquery:
            
            # if not laureatesquery and not othersquery:
                # return Response({"error": "payload and official page query not matching or no payload matches found"})    
            
            # elif not laureatesquery and othersquery:
            
            # elif laureatesquery and othersquery:   
                        
                            
                        
                
            
        return Response({"message":"You have provided non prize query search"})
        # elif(prizesquery and laureatesquery and not othersquery):
        #     prizes = data.prizes
        #     for prize in prizes:
        #         for laureates in prize.laureates:
        #             if laureates.id:
        #                 ids_group.append(laureates.id)
        #     for id in ids_group:
        #         return
        # elif laureatesquery and othersquery:
        #     return
        
            
                
        # else:
        #     response = requests.get(f"{url}{laureatesjson}")

        #return Response({"payload" : str(payload),"keys": str([{str(i):str(payload[i])} for i in payload if i in query_prize] + [{str(j):str(payload[j])} for j in payload if j in query_laureates] + [k for k in payload if k in query_others])})
    return Response({
                    "message" : "payload has error or empty",
                    "payload" : str(request.data),
                    "request" : str(request),
                    })