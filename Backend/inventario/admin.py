from django.contrib import admin
from django.contrib import admin
from .models import Medicamento, Proveedor, Perfil, Movimiento

admin.site.register(Medicamento)
admin.site.register(Proveedor)
admin.site.register(Perfil)
admin.site.register(Movimiento)
