from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User as DjangoUser


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Endpoint: POST /api/auth/login/
    Body: { "username": "admin@farmastock.com", "password": "1234" }
    Response: { "token": "abc123...", "rol": "admin", "nombre": "Admin" }
    """
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response(
            {'error': 'Usuario y contraseña son requeridos'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        django_user = DjangoUser.objects.get(email=username)
        user = authenticate(username=django_user.username, password=password)
    except DjangoUser.DoesNotExist:
        user = authenticate(username=username, password=password)

    if not user:
        return Response(
            {'error': 'Credenciales incorrectas'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_active:
        return Response(
            {'error': 'Usuario desactivado'},
            status=status.HTTP_403_FORBIDDEN
        )

    token, _ = Token.objects.get_or_create(user=user)

    rol = 'admin' if user.is_staff or user.is_superuser else 'usuario'

    return Response({
        'token': token.key,
        'rol': rol,
        'nombre': user.get_full_name() or user.username,
        'user_id': user.id,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """
    Endpoint: POST /api/auth/logout/
    Header: Authorization: Token abc123...
    """
    request.user.auth_token.delete()
    return Response(
        {'mensaje': 'Sesión cerrada correctamente'},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def perfil_view(request):
    """
    Endpoint: GET /api/auth/perfil/
    Devuelve los datos del usuario autenticado.
    """
    user = request.user
    rol = 'admin' if user.is_staff or user.is_superuser else 'usuario'
    return Response({
        'id': user.id,
        'username': user.username,
        'nombre': user.get_full_name() or user.username,
        'email': user.email,
        'rol': rol,
    }, status=status.HTTP_200_OK)