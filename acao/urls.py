"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home'),
<<<<<<< HEAD
    path('predict/acao', views.predict, name='predict'),
=======
    path('buscar/acao', views.buscar_acao, name='buscar_acao'),
>>>>>>> 91526e6563367c49e2fc3f51999336375182707c
    path('buscar/acao/array', views.get_acao_array, name='get_acao_array'),
    

]