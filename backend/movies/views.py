from movies.models import Actor, Movie, Review
from movies.serializers import (ActorSerializer, MovieSerializer,
                                ReviewSerializer)
from rest_framework import viewsets


class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow Movies to be viewed, created, deleted or edited
    """
    queryset = Movie.objects.all().order_by('title')
    serializer_class = MovieSerializer


class ActorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow Actors to be viewed, created, deleted or edited
    """
    queryset = Actor.objects.all().order_by('last_name')
    serializer_class = ActorSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allow Actors to be viewed, created, deleted or edited
    """
    queryset = Review.objects.all().order_by('grade')
    serializer_class = ReviewSerializer
