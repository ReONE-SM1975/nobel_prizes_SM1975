from django.urls import path
from . import views

urlpatterns = [
    path("hello/", views.hello_world, name="hello_world"),
    path("initialstartup", views.initial_startup, name="initial_startup"),
    path("fullprizes/", views.get_allPrizes, name="all_prizes"),
    path("fulllaureate/", views.get_allLaureate, name="all_laureate"),
    path("fullcountriescode/", views.get_allCountries, name="all_countries_code"),
    path("randomwinner/", views.get_randomWinner, name="randomwinner"),
    path("searchofficial/", views.searchofficial, name="searchofficial")
    ]