import pymysql

# 1. Engañamos a Django con la versión del conector
pymysql.version_info = (2, 2, 1, "final", 0)
pymysql.install_as_MySQLdb()

# 2. Importamos las características para parcharlas
from django.db.backends.mysql.features import DatabaseFeatures

# 3. Desactivamos 'RETURNING' (El error 1064 que te dio recién)
DatabaseFeatures.can_return_columns_from_insert = False
DatabaseFeatures.can_return_rows_from_bulk_insert = False