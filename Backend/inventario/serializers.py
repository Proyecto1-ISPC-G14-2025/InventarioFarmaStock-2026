from rest_framework import serializers
from .models import Proveedor, Medicamento, Usuario, Movimiento


class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'


class MedicamentoSerializer(serializers.ModelSerializer):
    proveedor_nombre = serializers.CharField(
        source='proveedor.nombre', read_only=True
    )

    class Meta:
        model = Medicamento
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre', 'email', 'rol', 'activo']


class MovimientoSerializer(serializers.ModelSerializer):
    medicamento_nombre = serializers.CharField(
        source='medicamento.nombre', read_only=True
    )
    usuario_nombre = serializers.CharField(
        source='usuario.nombre', read_only=True
    )

    class Meta:
        model = Movimiento
        fields = '__all__'