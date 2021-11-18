from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    num_visits = request.session.get('num_visits', 0)
    context = {'num_visits': num_visits}
    
    return render(request, 'napoleon_1806/index.html', context)
    
def test(request):
    num_visits = request.session.get('num_visits', 0)
    context = {'num_visits': num_visits}
    
    return render(request, 'napoleon_1806/test.html', context)
    