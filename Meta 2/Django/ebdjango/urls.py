"""TestPL URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import include, path
from DjangoApp import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="PharmacyES",
        default_version='v1',
        description="Pharmacy ES Project",
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('createDrugs/', views.create_drugs, name='create_drugs'),

    path('login/', views.login, name='login'),
    path('validateSession/', views.validateSession, name='validate_session'),
    path('payment/', views.startExecution, name='stepfuntion'),
    path('getExecutions/', views.getExecutions, name='getPayments'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('', views.react, name="reactLogin" ),


]
