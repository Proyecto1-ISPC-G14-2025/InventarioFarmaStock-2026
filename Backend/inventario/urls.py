from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProveedorViewSet,
    MedicamentoViewSet,
    UsuarioViewSet,
    MovimientoViewSet,
)

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet)
router.register(r'medicamentos', MedicamentoViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'movimientos', MovimientoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]