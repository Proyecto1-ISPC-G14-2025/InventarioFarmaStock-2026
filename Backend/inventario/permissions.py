from rest_framework.permissions import BasePermission


class EsAdmin(BasePermission):
    """Solo usuarios con is_staff=True pueden acceder."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class EsAdminOSoloLectura(BasePermission):
    """Admin puede todo. Usuario autenticado solo puede leer (GET)."""
    SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        if request.method in self.SAFE_METHODS:
            return True
        return request.user.is_staff