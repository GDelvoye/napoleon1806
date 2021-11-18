from django.urls import include, path

from . import views


app_name = 'napoleon_1806'
urlpatterns = [
    path('index_ori', views.index, name='index'),
]
urlpatterns += [
    path('', views.test, name='test'),
]