from django.urls import include, path

from . import views


app_name = 'napoleon_1806'
urlpatterns = [
    path('', views.index, name='index'),
]
urlpatterns += [
    path('test', views.test, name='test'),
]