from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Table ,Dish, Ingredient, AddOn

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ['id', 'username', 'email', 'is_staff']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required = True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password','password2']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password":"Password do not match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username = validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
        )
        return user

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model= Table
        fields=['id','name','qr_code']
        read_only_fields = ['qr_code']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'quantity_available']


class AddOnSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddOn
        fields = ['id', 'name', 'price']


class DishSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)
    add_ons = AddOnSerializer(many=True, read_only=True)

    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'ingredients', 'add_ons']

class DishWriteSerializer(serializers.ModelSerializer):
    ingredients = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Ingredient.objects.all()
    )
    add_ons = serializers.PrimaryKeyRelatedField(
        many=True, queryset=AddOn.objects.all()
    )

    class Meta:
        model = Dish
        fields = ['id', 'name', 'description', 'price', 'ingredients', 'add_ons']
