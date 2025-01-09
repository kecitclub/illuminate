from django.urls import path
from .views import UserView, ComplaintView, UserComplaintView

urlpatterns = [
    path('', UserView.as_view()),
    path('complaint/', ComplaintView.as_view()),
    path('complaint/user/', UserComplaintView.as_view()),
]
