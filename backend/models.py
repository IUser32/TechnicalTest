from django.db import models
from django.utils import timezone

class Movie(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    stock = models.DecimalField(decimal_places=0, max_digits=4)
    year = models.DecimalField(decimal_places=0, max_digits=4)
    created_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title 

class Client(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    full_name = models.CharField(max_length=200)
    birthdate = models.DateField()
    phonenumber = models.CharField(max_length=15)
    address = models.CharField(max_length=250)
    created_date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.full_name

class RentMovie(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    description = models.CharField(max_length=200, default='n/a')
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rent_date = models.DateField()
    estimated_date = models.DateField()
    created_date = models.DateTimeField(default=timezone.now)
    cost = models.DecimalField(decimal_places=2, max_digits=4, default=0)
    returned = models.BooleanField(default=0)

    def __str__(self):
        return self.description