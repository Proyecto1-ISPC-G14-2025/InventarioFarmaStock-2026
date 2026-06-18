from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import Proveedor, Medicamento, Perfil, Movimiento


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'


class MedicamentoSerializer(serializers.ModelSerializer):
    proveedor_nombre = serializers.CharField(
        source='proveedor.nombre', read_only=True
    )
    categoria_display = serializers.CharField(
        source='get_categoria_display', read_only=True
    )

    class Meta:
        model = Medicamento
        fields = '__all__'


class PerfilSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    nombre = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Perfil
        fields = ['id', 'username', 'email', 'nombre', 'password', 'rol', 'activo']

    def get_nombre(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def create(self, validated_data):
        user_data = validated_data.pop('user', {})
        password = validated_data.pop('password', None)

        user = User.objects.create(
            username=user_data.get('username', ''),
            email=user_data.get('email', ''),
        )
        if password:
            user.set_password(password)
            user.save()

        perfil = Perfil.objects.create(user=user, **validated_data)
        return perfil

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        password = validated_data.pop('password', None)

        if 'username' in user_data:
            instance.user.username = user_data['username']
        if 'email' in user_data:
            instance.user.email = user_data['email']
        if password:
            instance.user.set_password(password)
        instance.user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class MovimientoSerializer(serializers.ModelSerializer):
    medicamento_nombre = serializers.CharField(
        source='medicamento.nombre', read_only=True
    )
    usuario_nombre = serializers.CharField(
        source='usuario.username', read_only=True
    )

    class Meta:
        model = Movimiento
        fields = '__all__'