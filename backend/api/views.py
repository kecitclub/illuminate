from django.shortcuts import render
from .models import CustomUser, Complaint
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserSerialzer, ComplaintSerialzer
from rest_framework.permissions import IsAuthenticated, AllowAny


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
        serializer = ComplaintSerialzer(complaints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    
    def post(self, request, *args, **kwargs):
        serializer = ComplaintSerialzer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Your Complaint Has been registered."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserComplaintView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        complaints = Complaint.objects.filter(user=request.user)
        serializer = ComplaintSerialzer(complaints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class VerifyAdminView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_admin:
            return Response({"detail": "You are an admin"}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Only an admin can login"}, status=status.HTTP_401_UNAUTHORIZED)