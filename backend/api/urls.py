from django.urls import path
from .views import UserView, ComplaintView, UserComplaintView, VerifyAdminView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', UserView.as_view()),
    path('complaint/', ComplaintView.as_view()),
    path('complaint/user/', UserComplaintView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('verifyAdmin/', VerifyAdminView.as_view()),
]
