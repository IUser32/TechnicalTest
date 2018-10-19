from django.contrib import admin
from .models import Movie, Client, RentMovie

admin.site.register(Movie)
admin.site.register(Client)
admin.site.register(RentMovie)