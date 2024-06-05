from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=50)

class Country(models.Model):
    country_code = models.CharField(max_length=2)
    fullname = models.CharField(max_length=255)

class City(models.Model):
    name = models.CharField(max_length=255)

class Affiliation(models.Model):
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

class AdminUser(models.Model):
    admin_name = models.CharField(max_length=15, unique=True)
    admin_email = models.CharField(max_length=50, unique=True)
    uuid_token = models.CharField(max_length=255, unique=True)

class Winner(models.Model):
    firstname = models.CharField(max_length=255, null=False)
    lastname = models.CharField(max_length=255, null=True)
    abbrevative = models.CharField(max_length=50, null=True)
    affiliation = models.ForeignKey(Affiliation, on_delete=models.CASCADE, null=True)
    countryborn = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    countrydied = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    cityborn = models.ForeignKey(City,on_delete=models.CASCADE, null=True)
    citydied = models.ForeignKey(City,on_delete=models.CASCADE, null=True)
    dateofbirth = models.DateField(null=True)
    dateofdeath = models.DateField(null=True)
    gender = models.CharField(max_length=25, null=True)

class Laureates(models.Model):
    winner = models.ForeignKey(Winner, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    rewardyear = models.CharField(max_length=4, null=False)
    sharewith = models.ForeignKey(Winner, on_delete=models.CASCADE, null=True)
    motivation = models.CharField(max_length=255)
    overallmotivation = models.CharField(max_length=255, null=True)