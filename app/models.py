from django.db import models
from parler.models import TranslatableModel, TranslatedFields
# Create your models here.
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


class Predication(TranslatableModel):
    translations = TranslatedFields(
        titre = models.CharField(max_length=255, null=True, blank=True),
        nom_pred = models.TextField(null=True, blank=True),
        sous_titre = models.TextField(null=True, blank=True),
        nom_audio = models.TextField(null=True, blank=True),
        lien_audio = models.TextField(null=True, blank=True),
        duree = models.IntegerField(default=0, null=True, blank=True),
        lien_video = models.TextField(null=True, blank=True)
    )
    numero = models.IntegerField(default=1)
    # id_langue = models.ForeignKey("Langue", on_delete=models.CASCADE)
    
    # class Meta:
    #     db_table = 'predication'
    def __str__(self):
        """Unicode representation of Page Info Detail."""
        return self.titre


class Verset(TranslatableModel):
    translations = TranslatedFields(
    numero = models.IntegerField(),
    contenue = models.TextField(),
    # id_langue = models.ForeignKey("Langue", on_delete=models.CASCADE)
    id_pred = models.ForeignKey("Predication", on_delete=models.CASCADE),
    id_parab = models.TextField())
    class Meta:
        db_table = 'verset'

class Titre(models.Model):
    titre = models.TextField()
    nombre = models.TextField()
    class Meta:
        db_table = 'titre'