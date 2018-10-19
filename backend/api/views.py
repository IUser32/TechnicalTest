from rest_framework.generics import ListAPIView, RetrieveAPIView
from backend.models import Movie, Client
from .serializers import MovieSerializer, ClientSerializer

class MovieListView(ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class MovieDetailView(RetrieveAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class ClientListView(ListAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer