from django.db import models


class Actor(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()


class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    actors = models.ManyToManyField(Actor)


class Review(models.Model):
    grade = models.FloatField()
    movie = models.ForeignKey(
        Movie, on_delete=models.CASCADE, related_name="reviews")
