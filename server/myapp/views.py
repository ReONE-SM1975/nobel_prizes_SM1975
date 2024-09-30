from django.shortcuts import render
# from django.http import JsonResponse
# from django.views.decorators.http import require_http_methods

from rest_framework.decorators import api_view
from rest_framework.response import Response

import requests
import json

from .constants import PARENTSCONS, CHILDCONS_T1, CHILDCONS_T2, CHILDCONS_T3, CHILDCONS_T4, SPECIAL, CATEGORYLIST, URL

PRIZES, LAUREATES, AFFILIATIONS = PARENTSCONS.values()
AFFILIATION, BORN, BORNCOUNTRY, BORNCOUNTRYCODE, BORNCITY, BORNDATE  = CHILDCONS_T1.values()
CATEGORY, CITY, COUNTRY, DIED, DIEDCITY, DIEDCOUNTRY,  = CHILDCONS_T2.values()
DIEDCOUNTRYCODE, DIEDDATE, GENDER, ID = CHILDCONS_T3.values()
MOTIVATION, NAME, OVERALLMOTIVATION, SHARE, YEAR, YEARTO = CHILDCONS_T4.values()
CHEMISTRY, ECONOMICS, LITERATURE, MEDICINE, PEACE, PHYSICS = CATEGORYLIST.values()
FULLNAME, KEYWORD, FIRSTNAME, SURNAME, IDTO = SPECIAL.values()
URL, PRIZEJSON, LAUREATEJSON, COUNTRYJSON = URL.values()

# Create your views here.
def writePrizes(year, category, overallmotivation, laureates=[]):
    return {
        YEAR : str(year),
        CATEGORY : str(category),
        OVERALLMOTIVATION : str(overallmotivation),
        LAUREATES : list(laureates),
    }

def writePrizesLaureates(id, firstname, surname, motivation, share):
    return {
        ID :str(id),
        FIRSTNAME :str(firstname),
        SURNAME :str(surname),
        MOTIVATION :str(motivation),
        SHARE :str(share),
    }

def writeLaureates(id,firstname,surname,born,died,borncountry,borncountrycode,borncity,diedcountry,diedcountrycode,diedcity,gender,prizes=[]):
    return {
        ID :str(id),
        FIRSTNAME :str(firstname),
        SURNAME :str(surname),
        BORN :str(born),
        DIED :str(died),
        BORNCOUNTRY :str(borncountry),
        BORNCOUNTRYCODE :str(borncountrycode),
        BORNCITY :str(borncity),
        DIEDCOUNTRY :str(diedcountry),
        DIEDCOUNTRYCODE :str(diedcountrycode),
        DIEDCITY :str(diedcity),
        GENDER :str(gender),
        PRIZES :list(prizes),
    }

def writeLaureatesPrizes(year,category,share,motivation,affiliations=[]):
    return {
        YEAR :str(year),
        CATEGORY :str(category),
        SHARE :str(share),
        MOTIVATION :str(motivation),
        AFFILIATIONS :list(affiliations),
    }

def writeLaureatesPrizesAffiliations(name,city,country):
    return {
        NAME :str(name),
        CITY :str(city),
        COUNTRY :str(country),
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
    response = requests.get(f'{URL}{PRIZEJSON}')
    return Response(response.json())

@api_view(['GET'])
def get_allLaureate(request):
    response = requests.get(f'{URL}{LAUREATEJSON}')
    return Response(response.json())

@api_view(['GET'])
def get_allCountries(request):
    response = requests.get(f'{URL}{COUNTRYJSON}')
    return Response(response.json())

@api_view(['POST'])
def get_randomWinner(request):
    payload = request.data
    if payload:
        text = []
        char = "&"
        for key in payload:
            text.append(f"{key}={payload[key]}")
        response = requests.get(f"{URL}{PRIZEJSON}?{char.join(text)}")
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
        # print("payload",payload, dict(payload))
        query_prize = [YEAR, YEARTO, CATEGORY]
        query_laureates = [CITY, COUNTRY , AFFILIATIONS, KEYWORD]
        query_others = [FIRSTNAME, SURNAME , ID , IDTO]
        result = {}
        ids_group = []
        ids_query = []
        prizesquery = []
        prizesObjs = []
        laureatesquery = []
        laureatesObjs = []
        othersquery = []
        char = "&"
        space = "%20"
        
        for key in dict(payload):
            # bug: empty value should make list empty
            if key in query_prize and payload[key]:
                prizesquery.append(f"{key}={payload[key]}")
                prizesObjs.append([key,payload[key]])
            elif key in query_laureates and payload[key]:
                # 'affiliations' in laureates query is 'affiliation'. 'affiliations' is the return response key. query is 'affiliation'
                if key == AFFILIATIONS:
                    laureatesquery.append(f"{AFFILIATION}={payload[key]}")
                    laureatesObjs.append([AFFILIATION, payload[key]])
                else :
                    laureatesquery.append(f"{key}={payload[key]}")
                    laureatesObjs.append([key, payload[key]]) 
            elif key in query_others and payload[key]:
                othersquery.append(key)
        if laureatesquery:
            laureatesquery[:0] =["gender=All"]       
        # print("prizesquery:",prizesquery)
        # print("laureatesquery:",laureatesquery)
        # print("othersquery:",othersquery)
        
        if prizesquery:
            response = requests.get(f"{URL}{PRIZEJSON}?{char.join(prizesquery)}")
            status = response.status_code
            data = response.json()
            datalist = data.keys()
            if not laureatesquery and not othersquery:
                return Response(data)
            elif othersquery and not laureatesquery:
                try:
                    result[PRIZES] = []
                    # print("data keys: ", datalist)
                    if PRIZES in datalist and len(data[PRIZES]):
                        # print("prizes length:",len(data["prizes"]))
                        for item in data[PRIZES]:
                            itemlist = item.keys()
                            if LAUREATES in itemlist and len(item[LAUREATES]):
                                year=item[YEAR]
                                category=item[CATEGORY]
                                overallmotivation = ""
                                if OVERALLMOTIVATION in itemlist:
                                    overallmotivation = item[OVERALLMOTIVATION]
                                #laureates = []
                                if LAUREATES in itemlist and len(item[LAUREATES]):
                                    for laur in item[LAUREATES]:
                                        laurlist = laur.keys()
                                        id = laur[ID]
                                        firstname = laur[FIRSTNAME]
                                        surname = ""
                                        if SURNAME in laurlist:
                                            surname = laur[SURNAME]
                                        motivation = laur[MOTIVATION]
                                        share = laur[SHARE]
                                        
                                        testpass = 0
                                        for ele in othersquery:
                                            if payload[ele] == laur[ele]:
                                                testpass += 1
                                        if testpass == len(othersquery):
                                            temp = {
                                                ID:id,
                                                FIRSTNAME:firstname,
                                                SURNAME: surname,
                                                MOTIVATION:motivation,
                                                SHARE:share,
                                            }
                                            result[PRIZES].append(
                                                {
                                                    YEAR:year,
                                                    CATEGORY:category,
                                                    OVERALLMOTIVATION:overallmotivation,
                                                    LAUREATES:[temp]
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
                
            elif laureatesquery: 
                result[LAUREATES] = []

                if PRIZES in datalist and len(data[PRIZES]):
                    for item in data[PRIZES]:
                        itemlist = item.keys()
                        if LAUREATES in itemlist and len(item[LAUREATES]):
                            for laur in item[LAUREATES]:
                                ids_group.append(laur[ID])
                                ids_query.append(f"id={laur[ID]}")
                    responselaur = requests.get(f"{URL}{LAUREATEJSON}?{char.join(laureatesquery)}")    
                    pass
                # if not othersquery:
                    
                # elif othersquery:
        
        elif not prizesquery:
            
            if not laureatesquery and not othersquery:
                
                responselur = requests.get(f"{URL}{LAUREATEJSON}?{char.join(laureatesquery)}")
                return Response(responselur.json())
                # return Response({"error": "payload and official page query not matching or no payload matches found"})    
            
            # elif not laureatesquery and othersquery:
            
            elif laureatesquery and not othersquery: 
                try :
                    print("laureatesquery:",laureatesquery)
                    query = char.join(laureatesquery) if len(laureatesquery) > 1 else laureatesquery
                    response = requests.get(f"{URL}{LAUREATEJSON}?gender=All&{char.join(laureatesquery)}")
                    return Response(response.json())
                except Exception as e:
                    return Response({"error":str(e),"payload":str(request.data),"request":str(request),"laureatesquery":str(laureatesquery)})

            
        return Response({"message":"You have provided non prize query search", "payload":str(request.data),"request":str(request)})

    return Response({
                    "message" : "payload has error or empty",
                    "payload" : str(request.data),
                    "request" : str(request),
                    })