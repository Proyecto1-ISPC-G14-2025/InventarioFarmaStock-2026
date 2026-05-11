from django.db import models


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
    nombre = models.CharField(max_length=200)
    codigo_barras = models.CharField(max_length=100, unique=True)
    categoria = models.CharField(max_length=100)
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


class Usuario(models.Model):
    ROL_CHOICES = [
        ('admin', 'Administrador'),
        ('usuario', 'Usuario'),
    ]
    nombre = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    password_hash = models.CharField(max_length=255)
    rol = models.CharField(max_length=10, choices=ROL_CHOICES, default='usuario')
    activo = models.BooleanField(default=True)

    class Meta:
        db_table = 'usuarios'

    def __str__(self):
        return self.email


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
        Usuario,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='movimientos'
    )

    class Meta:
        db_table = 'movimientos'

    def __str__(self):
        return f"{self.tipo} - {self.medicamento.nombre} ({self.cantidad})"