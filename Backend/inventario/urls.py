from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProveedorViewSet,
    MedicamentoViewSet,
    PerfilViewSet,
    MovimientoViewSet,
)

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet)
router.register(r'medicamentos', MedicamentoViewSet)
router.register(r'perfiles', PerfilViewSet)
router.register(r'movimientos', MovimientoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]