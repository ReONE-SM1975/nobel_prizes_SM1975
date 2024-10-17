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
def tempDict(data, key):
    # purpose of the fn is to prepare a backbone for potential matching data, then
    # check if the payload[key] matches with response.data.json()
    # if there are more than one test, it should not repeate the same result
    # payload[key] are linear, while respnse.data.json are data[key] = [{},{}]
    datalist = data.keys()
    tempDict = {}
    if key in datalist and len(data[key]):
        for item in data[key]:
            for itemKey in item:
                if type(item[itemKey], str):
                    tempDict[itemKey] = str(item[itemKey])
                elif type(item[itemKey], list):
                    tempDict[itemKey] = list([])
    return dict(tempDict)

def createLaureatesSearch(payload):
    keyPool = []
    fixedqueries = []
    finalqueries = []
    chars = "&"
    for key in payload:
        if payload[key]:
            keyPool.append(key)
            if key == KEYWORD:
                fixedqueries.append(f"{MOTIVATION}={payload[key]}")
            elif key == AFFILIATIONS:
                fixedqueries.append(f"{AFFILIATION}={payload[AFFILIATIONS]}")
    if len(fixedqueries) and CITY in keyPool:
        finalqueries.append(f"{BORNCITY}={payload[CITY]}&{chars.join(fixedqueries)}")
        finalqueries.append(f"{DIEDCITY}={payload[CITY]}&{chars.join(fixedqueries)}")
    if len(fixedqueries) and COUNTRY in keyPool:
        finalqueries.append(f"{BORNCOUNTRY}={payload[CITY]}&{chars.join(fixedqueries)}")
        finalqueries.append(f"{DIEDCOUNTRY}={payload[CITY]}&{chars.join(fixedqueries)}")
        
    # logic needed separated due to function only itterated for each key
    
    if not len(fixedqueries):
        if payload[CITY]:
            finalqueries.append(f"{BORNCITY}={payload[CITY]}")
            finalqueries.append(f"{DIEDCITY}={payload[CITY]}")
        if payload[COUNTRY]:
            finalqueries.append(f"{BORNCOUNTRY}={payload[CITY]}")
            finalqueries.append(f"{DIEDCOUNTRY}={payload[CITY]}")
    if len(finalqueries):
        return finalqueries
    return fixedqueries

def removeDuplicated(thekey, data):
    unique_result = set(frozenset(d.items()) for d in data[thekey])
    data[thekey] = [dict(ds) for ds in unique_result]
    return data
    
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
        allqueryKeys = [x for x in payload if payload[x]]
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
                
                # laureatesquery.append(createLaureatesSearch(payload))
                laureatesObjs.append([key, payload[key]])
                
                
            elif key in query_others and payload[key]:
                othersquery.append(key)
        if CITY or COUNTRY or KEYWORD or AFFILIATIONS in allqueryKeys:
            laureatesquery.append(createLaureatesSearch(payload))
        print("prizesquery:",prizesquery)
        print("prizesObjs:",prizesObjs)
        print("laureatesquery:",laureatesquery)
        print("laureatesObjs:",laureatesObjs)
        print("othersquery:",othersquery)
        
        if laureatesquery:
            
            try:
                responses = []
                result[LAUREATES] = []
                for res in laureatesquery:
                    response = requests.get(f"{URL}{LAUREATEJSON}?gender=All&{char.join(res)}")
                    data = response.json()
                    # datalist = data.keys()
                    responses.append(data)
                    
                # more logic insert here for laureates
                # print(responses)
                if not prizesquery and not othersquery:
                    # return Response(response.json())
                    # return Response(result)
                    return Response(responses)
                elif not prizesquery and othersquery:
                    testNum = len(othersquery)
                    if LAUREATES in data and len(data[LAUREATES]):
                        for item in data[LAUREATES]:
                            for laur in item:
                                for priz in laur:
                                    pass
                            templaur = tempDict(data, LAUREATES)
                            temppriz = {}
                            tempaffi = {}
                        pass
                elif prizesquery and not othersquery:
                    testNum = len(prizesquery)
                    pass
                elif prizesquery and othersquery:
                    test1Num = len(prizesquery)
                    test2Num = len(othersquery)
                    pass
        

            except Exception as e:
                return Response({
                    "message": "laureates query logic error(s)",
                    "payload": str(payload),
                    "error": str(e),
                    "status": str(response.status_code),
                })
        elif not laureatesquery:
            try :
                result[PRIZES] = []
                response = requests.get(f"{URL}{PRIZEJSON}?{char.join(prizesquery)}")
                status = response.status_code
                data = response.json()
                # datalist = data.keys()
                if prizesquery and not othersquery:
                    return Response(data)
                elif prizesquery and othersquery:
                    
                    # print("data keys: ", datalist)
                    #if PRIZES in datalist and len(data[PRIZES]):
                        # print("prizes length:",len(data["prizes"]))
                        #for item in data[PRIZES]:
                            
                        #    itemlist = item.keys()
                        #    if LAUREATES in itemlist and len(item[LAUREATES]):
                                
                        #        year=item[YEAR]
                        #        category=item[CATEGORY]
                        #        overallmotivation = ""
                        #        if OVERALLMOTIVATION in itemlist:
                        #            overallmotivation = item[OVERALLMOTIVATION]
                                
                        #        if LAUREATES in itemlist and len(item[LAUREATES]):
                                    
                        #            for laur in item[LAUREATES]:
                                        
                        #                laurlist = laur.keys()
                        #                id = laur[ID]
                        #                firstname = laur[FIRSTNAME]
                        #                surname = ""
                        #                if SURNAME in laurlist:
                        #                    surname = laur[SURNAME]
                        #                motivation = laur[MOTIVATION]
                        #                share = laur[SHARE]
                                        #
                    
                    for item in data[PRIZES]:
                        
                        for laur in item[LAUREATES]:
                            testpass = 0
                            for ele in othersquery:
                                if payload[ele] == laur[ele]:
                                    testpass += 1
                            if testpass == len(othersquery):
                                tempPrizes = tempDict(data,PRIZES)
                                tempLaur = tempDict(dict({LAUREATES: item[LAUREATES]}), LAUREATES)
                                tempPrizes[LAUREATES].append(tempLaur)
                                result[PRIZES].append(tempPrizes)
                                            #temp = {
                                            #    ID:id,
                                            #    FIRSTNAME:firstname,
                                            #    SURNAME: surname,
                                            #    MOTIVATION:motivation,
                                            #    SHARE:share,
                                            #}
                                            #result[PRIZES].append(
                                            #    {
                                            #        YEAR:year,
                                            #        CATEGORY:category,
                                            #        OVERALLMOTIVATION:overallmotivation,
                                            #        LAUREATES:[temp]
                                            #    }
                                            #)
                        return Response(result)                    
                                
                    else: 
                        return Response(result)
                elif not prizesquery and not othersquery:
                    return Response({
                        "message" : "no search provided or scripts logic has error(s)"
                    })
            except Exception as e:
                return Response({
                    "message":"prizesquery logic error(s)", 
                    "error":str(e),
                    "status":str(status)
                    })     
    return Response({
                    "message" : "payload is emnpty or code has error(s)",
                    "payload" : str(request.data),
                    "request" : str(request),
                    })