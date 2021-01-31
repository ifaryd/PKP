from django.db import models

# Create your models here.x
class Actualite(models.Model):
    date = models.TextField()
    heure = models.TextField()
    details = models.TextField()
    class Meta:
        db_table = 'actualite'



class Langue(models.Model):
    intial = models.TextField()
    classe = models.IntegerField()
    type_contenue = models.TextField()
    sens_lecture = models.TextField()
    class Meta:
        db_table = 'langue'


class Predication(models.Model):
    numero = models.IntegerField()
    nom_pred = models.TextField()
    titre = models.TextField()
    sous_titre = models.TextField()
    nom_audio = models.TextField()
    lien_audio = models.TextField()
    duree = models.IntegerField()
    id_langue = models.ForeignKey("Langue", on_delete=models.CASCADE)
    lien_video = models.TextField()
    class Meta:
        db_table = 'predication'


class Verset(models.Model):
    numero = models.IntegerField()
    contenue = models.TextField()
    id_langue = models.ForeignKey("Langue", on_delete=models.CASCADE)
    id_pred = models.ForeignKey("Predication", on_delete=models.CASCADE)
    id_parab = models.TextField()
    class Meta:
        db_table = 'verset'
        

class Titre(models.Model):
    titre = models.TextField()
    nombre = models.TextField()
    class Meta:
        db_table = 'titre'