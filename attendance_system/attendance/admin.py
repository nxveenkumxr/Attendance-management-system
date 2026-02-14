
# Register your models here.
from django.contrib import admin
from .models import Student, Attendance
from .models import Department

admin.site.register(Department)


admin.site.register(Student)
admin.site.register(Attendance)
