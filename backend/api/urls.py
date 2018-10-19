from django.urls import path
from .views import (
    MovieListView, 
    MovieDetailView, 
    ClientListView,
    RentMovieView,
)

urlpatterns =[
    path('', MovieListView.as_view()),
    path('<pk>', MovieDetailView.as_view()),
    path('client/', ClientListView.as_view()),
    path('rentmovie/', RentMovieView.as_view()),

]