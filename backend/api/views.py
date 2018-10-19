from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView
from backend.models import Movie, Client, RentMovie
from .serializers import MovieSerializer, ClientSerializer, RentMovieSerializer

class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ClientListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class RentMovieView(CreateAPIView):
    queryset = RentMovie.objects.all()
    serializer_class = RentMovieSerializer

class ReturnMovieView(UpdateAPIView):
    queryset = RentMovie.objects.all()
    serializer_class = RentMovieSerializer

class RentMovieListView(ListAPIView):
    queryset = RentMovie.objects.all()
    serializer_class = RentMovieSerializer