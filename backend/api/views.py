from django.shortcuts import render
from .models import CustomUser, Complaint, ProgressReport
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerialzer, ComplaintSerialzer, ProgressReportSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser

class UserView(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerialzer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self, request):
        serializer = UserSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "User created"}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplaintView(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request):
        complaints = Complaint.objects.all()
        # Pass 'request' context to serializer so it can build absolute image URLs
        serializer = ComplaintSerialzer(complaints, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Pass 'request' context to serializer to set the user for the complaint
        serializer = ComplaintSerialzer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Your Complaint has been registered."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserComplaintView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        complaints = Complaint.objects.filter(user=request.user)
        serializer = ComplaintSerialzer(complaints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class VerifyAdminView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"detail": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if getattr(user, 'is_admin', False):  
            return Response({"detail": "You are an admin"}, status=status.HTTP_200_OK)

        return Response({"detail": "Only an admin can login"}, status=status.HTTP_403_FORBIDDEN)


class VerifyComplaintView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if not user.is_admin:
            return Response({"detail": "You cannot verify the comments"}, status=status.HTTP_403_FORBIDDEN)
        
        complaint_id = request.data.get('complaint')
        if not complaint_id:
            return Response({"detail": "Complaint ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        
        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response({"detail": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)

        complaint.admin_verified = True
        complaint.save()
        return Response({"detail": "Verified the complaint successfully"}, status=status.HTTP_200_OK)


class ComplaintDeleteAdminView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, complaint_id):
        user = request.user
        if not user.is_admin:
            return Response({"detail": "You cannot delete the complaints"}, status=status.HTTP_403_FORBIDDEN)
        
        if not complaint_id:
            return Response({"detail": "Complaint ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        
        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response({"detail": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)

        complaint.delete()
        return Response({"detail": "Deleted the complaint successfully"}, status=status.HTTP_204_NO_CONTENT)




class ProgressReportsByComplaintView(APIView):
    
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]


    def get(self, request, complaint_id):

        if not complaint_id:
            return Response({"detail": "Complaint ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response({"detail": "Complaint not found."}, status=status.HTTP_404_NOT_FOUND)

        progress_reports = complaint.progress_reports.all()
        serializer = ProgressReportSerializer(progress_reports, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



class AddProgressReportView(APIView):

    permission_classes = [IsAuthenticated]

    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        complaint_id = request.data.get('complaint')
        if not complaint_id:
            return Response({"detail": "Complaint ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            complaint = Complaint.objects.get(id=complaint_id)
        except Complaint.DoesNotExist:
            return Response({"detail": "Complaint not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['complaint'] = complaint.id 

        image = request.FILES.get('image')
        if image:
            data['image'] = image 

        serializer = ProgressReportSerializer(data=data)


        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)