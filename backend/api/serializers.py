from rest_framework import serializers
from .models import CustomUser, Complaint


class UserSerialzer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'is_admin', 'username', 'password']
        # extra_kwargs = {
        #     'is_admin': {'read_only': True},
        # }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class ComplaintSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ['id', 'title', 'description', 'created_at', 'user']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        return super().create(validated_data)
