from rest_framework import serializers
from backend.models import Movie, Client, RentMovie

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'description', 'stock', 'year')

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id', 'full_name')

class RentMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = RentMovie
        fields = ('id', 'description', 'client', 'movie', 'rent_date', 'estimated_date', 'cost', 'returned')
    def create(self, validated_data):
        currentmovie = Movie.objects.get(pk=validated_data.get('movie').id)

        if(currentmovie.stock <= 0):
            raise serializers.ValidationError("Movie not available")
                
        currentmovie.stock -= 1

        obj = RentMovie.objects.create(**validated_data)
        obj.save()
        currentmovie.save()
        return obj