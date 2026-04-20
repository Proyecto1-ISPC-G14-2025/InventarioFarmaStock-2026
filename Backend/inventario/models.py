from django.db import models

class Medicamento(models.Model):
    nombre = models.CharField(max_length=200)
    lote = models.CharField(max_length=100)
    cantidad = models.IntegerField()
    fecha_expiracion = models.DateField()
    
    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'medicamentos'

# Create your models here.
