from rest_framework import serializers
from .models import CustomUser, Complaint, ProgressReport


class UserSerialzer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'is_admin', 'username', 'password']
        extra_kwargs = {
            'is_admin': {'read_only': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class ProgressReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressReport
        fields = ['id', 'complaint', 'title', 'description', 'image', 'created_at']

    def get_image_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.fingerprint.url
        return request.build_absolute_url(photo_url)


class ComplaintSerialzer(serializers.ModelSerializer):
    
    username = serializers.CharField(source='user.username', read_only=True)
    progress_reports = ProgressReportSerializer(many=True, read_only=True) 

    class Meta:
        model = Complaint
        fields = ['id', 'title', 'description','progress','location', 'created_at', 'username', 'admin_verified', 'progress_reports']

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['user'] = request.user
        return super().create(validated_data)


