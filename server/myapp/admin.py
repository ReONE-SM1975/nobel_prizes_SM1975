from django.contrib import admin
from models import Category, Country, City, AdminUser, Affiliation, Laureates, Winner


# Register your models here.
admin.site.register(Category)
admin.site.register(Country)
admin.site.register(City)
admin.site.register(AdminUser)
admin.site.register(Affiliation)
admin.site.register(Laureates)
admin.site.register(Winner)