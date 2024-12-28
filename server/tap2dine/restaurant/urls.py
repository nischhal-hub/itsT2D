from django.urls import path,include
from .views import TestAuthView
from .views import UserRegistrationView,TableViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tables',TableViewSet,basename='table')

urlpatterns = [
    path('test-auth/', TestAuthView.as_view(), name='test_auth'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('',include(router.urls)),
]
