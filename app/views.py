from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')


def contact(request):
    return render(request, 'contact.html')

def predications_lists(request):
    return render(request, 'predications-lists.html')