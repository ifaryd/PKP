from .import models
from django.conf import settings


def lang(request):
    
    request.GET.get(['fr','en','es'])