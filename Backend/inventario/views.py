from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db import models, transaction
from datetime import timedelta

from .models import Proveedor, Medicamento, Perfil, Movimiento
from .serializers import (
    ProveedorSerializer,
    MedicamentoSerializer,
    PerfilSerializer,
    MovimientoSerializer,
)
from .permissions import EsAdminOSoloLectura, EsAdmin


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all().order_by('nombre')
    serializer_class = ProveedorSerializer
    permission_classes = [EsAdminOSoloLectura]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all().order_by('nombre')
    serializer_class = MedicamentoSerializer
    permission_classes = [EsAdminOSoloLectura]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='proximos-a-vencer')
    def proximos_a_vencer(self, request):
        limite = timezone.now().date() + timedelta(days=30)
        proximos = Medicamento.objects.filter(
            fecha_expiracion__lte=limite
        ).order_by('fecha_expiracion')
        serializer = self.get_serializer(proximos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='stock-bajo')
    def stock_bajo(self, request):
        bajos = Medicamento.objects.filter(
            stock_actual__lte=models.F('stock_minimo')
        ).order_by('stock_actual')
        serializer = self.get_serializer(bajos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='categorias')
    def categorias(self, request):
        """Devuelve las categorias disponibles."""
        categorias = [
            {'value': c[0], 'label': c[1]}
            for c in Medicamento.CATEGORIA_CHOICES
        ]
        return Response(categorias, status=status.HTTP_200_OK)


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all().order_by('user__username')
    serializer_class = PerfilSerializer
    permission_classes = [EsAdmin]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.user.delete()  # Elimina también el User de Django
        return Response(status=status.HTTP_204_NO_CONTENT)


class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all().order_by('-fecha')
    serializer_class = MovimientoSerializer
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        med_id = request.data.get('medicamento')
        tipo = request.data.get('tipo')
        cantidad = int(request.data.get('cantidad', 0))

        try:
            med = Medicamento.objects.select_for_update().get(id=med_id)
        except Medicamento.DoesNotExist:
            return Response(
                {'error': 'Medicamento no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

        if tipo == 'salida' and med.stock_actual < cantidad:
            return Response(
                {'error': 'Stock insuficiente'},
                status=status.HTTP_400_BAD_REQUEST
            )

        movimiento = serializer.save()

        if tipo == 'entrada':
            med.stock_actual += cantidad
        elif tipo == 'salida':
            med.stock_actual -= cantidad
        med.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)