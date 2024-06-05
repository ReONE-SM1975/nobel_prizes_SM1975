from django.db import models

# Create your models here.
class Category(models.Model):
    categories = {
        "physics": "Physics",
        "chemistry": "Chemistry",
        "medicine": "Physiology or Medicine",
        "peace": "Peace",
        "literature" : "Literature",
        "economics" : "Economics Sciences"
    }
    name = models.CharField(max_length=15, choices=categories,default=categories["chemistry"])

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
    countryborn = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, related_name="born_country")
    countrydied = models.ForeignKey(Country, on_delete=models.CASCADE, null=True, related_name="died_country")
    cityborn = models.ForeignKey(City,on_delete=models.CASCADE, null=True, related_name="born_city")
    citydied = models.ForeignKey(City,on_delete=models.CASCADE, null=True, related_name="died_city")
    dateofbirth = models.DateField(null=True)
    dateofdeath = models.DateField(null=True)
    gender = models.CharField(max_length=25, null=True)

class Laureates(models.Model):
    winner = models.ForeignKey(Winner, on_delete=models.CASCADE, related_name="laureates")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    rewardyear = models.CharField(max_length=4, null=False)
    sharewith = models.ForeignKey(Winner, on_delete=models.CASCADE, null=True, related_name="shared_laureates")
    motivation = models.CharField(max_length=255)
    overallmotivation = models.CharField(max_length=255, null=True)