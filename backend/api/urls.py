from django.urls import path
from .views import UserView, ComplaintView, UserComplaintView, VerifyAdminView, AddProgressReportView, ProgressReportsByComplaintView, VerifyComplaintView, ComplaintDeleteAdminView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', UserView.as_view()),
    path('complaint/', ComplaintView.as_view()),
    path('complaint/user/', UserComplaintView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('verifyAdmin/', VerifyAdminView.as_view()),
    path('verifyComplaint/', VerifyComplaintView.as_view()),
    path('progressReport/', AddProgressReportView.as_view()),
    path('complaintDeleteView/<int:complaint_id>/', ComplaintDeleteAdminView.as_view()),
    path('progressReport/<int:complaint_id>/', ProgressReportsByComplaintView.as_view()),
]
