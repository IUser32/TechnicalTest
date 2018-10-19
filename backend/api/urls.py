from django.urls import path
from .views import (
    MovieListView, 
    MovieDetailView, 
    ClientListView,
    RentMovieView,
    RentMovieListView,
    ReturnMovieView
)

urlpatterns =[
    path('', MovieListView.as_view()),
    path('<pk>', MovieDetailView.as_view()),
    path('client/', ClientListView.as_view()),
    path('rentmovie/create/', RentMovieView.as_view()),
    path('rentmovie/return/<pk>', ReturnMovieView.as_view()),
    path('rentmovie/', RentMovieListView.as_view()),
    

]