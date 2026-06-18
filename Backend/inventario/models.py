from django.db import models
from django.contrib.auth.models import User


class Proveedor(models.Model):
    nombre = models.CharField(max_length=200)
    contacto = models.CharField(max_length=100, blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)

    class Meta:
        db_table = 'proveedores'

    def __str__(self):
        return self.nombre


class Medicamento(models.Model):
    CATEGORIA_CHOICES = [
        ('analgesico', 'Analgésico'),
        ('antiinflamatorio', 'Antiinflamatorio'),
        ('antibiotico', 'Antibiótico'),
        ('antihipertensivo', 'Antihipertensivo'),
        ('antidiabético', 'Antidiabético'),
        ('vitamina', 'Vitamina / Suplemento'),
        ('antihistaminico', 'Antihistamínico'),
        ('gastrointestinal', 'Gastrointestinal'),
        ('dermatologico', 'Dermatológico'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=200)
    codigo_barras = models.CharField(max_length=100, unique=True)
    categoria = models.CharField(
        max_length=50,
        choices=CATEGORIA_CHOICES,
        default='otro'
    )
    lote = models.CharField(max_length=100)
    stock_actual = models.IntegerField(default=0)
    stock_minimo = models.IntegerField(default=5)
    precio_compra = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    fecha_expiracion = models.DateField()
    proveedor = models.ForeignKey(
        Proveedor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='medicamentos'
    )

    class Meta:
        db_table = 'medicamentos'

    def __str__(self):
        return self.nombre


class Perfil(models.Model):
    """
    Extiende auth.User con datos adicionales del sistema.
    Un Perfil por cada User de Django.
    """
    ROL_CHOICES = [
        ('admin', 'Administrador'),
        ('usuario', 'Usuario'),
    ]
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil'
    )
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='usuario')
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'perfiles'

    def __str__(self):
        return f"{self.user.username} ({self.rol})"


class Movimiento(models.Model):
    TIPO_CHOICES = [
        ('entrada', 'Entrada'),
        ('salida', 'Salida'),
    ]
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    motivo = models.CharField(max_length=255, blank=True)
    medicamento = models.ForeignKey(
        Medicamento,
        on_delete=models.CASCADE,
        related_name='movimientos'
    )
    usuario = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='movimientos'
    )

    class Meta:
        db_table = 'movimientos'

    def __str__(self):
        return f"{self.tipo} - {self.medicamento.nombre} ({self.cantidad})"