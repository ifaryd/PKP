# vim: set fileencoding=utf-8 :
from django.contrib import admin
from django.contrib.sites.admin import SiteAdmin
from django.contrib.sites.models import Site
from parler.admin import TranslatableAdmin, TranslatableStackedInline
from . import models

class PredicationAdmin(TranslatableAdmin):
    
    list_display = (
        'id',
        'titre',
        'nom_pred',
        'sous_titre',

    )
class LangueAdmin(admin.ModelAdmin):
    
    list_display = (
        'id',
        'intial',
        'classe',
        'type_contenue',

    )
class VersetAdmin(TranslatableAdmin):
    
    list_display = (
        'id',
        'numero',
        'contenue',
        'id_pred',

    )

    
def _register(model, admin_class):
    admin.site.register(model, admin_class)


_register(models.Predication, PredicationAdmin)
_register(models.Verset, VersetAdmin)
_register(models.Langue, LangueAdmin)
# Register your models here.

