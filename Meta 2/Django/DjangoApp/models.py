from django.db import models

class Drug(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.IntegerField()
    alternatives = models.CharField(max_length=100)

    class Meta:
        managed = False

    def __str__(self):
        return self.name
    
class User(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    


