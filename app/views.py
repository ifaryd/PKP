from django.shortcuts import render
from . import models
# Create your views here.

def index(request):
    
    predication = models.Predication.objects.language('fr')[:1].get()
    verset = models.Verset.objects.language(predication.get_current_language())[:1].get()
    print(predication.nom_audio, verset.contenue)
    return render(request, 'index.html')


def contact(request):
    return render(request, 'contact.html')

def predications_lists(request):
    return render(request, 'predications-lists.html')