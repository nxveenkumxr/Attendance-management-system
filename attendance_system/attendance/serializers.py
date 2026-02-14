from rest_framework import serializers
from .models import Student, Attendance, Department


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(
        source="department.name",
        read_only=True
    )

    class Meta:
        model = Student
        fields = "__all__"


class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(
        source="student.name",
        read_only=True
    )

    department_name = serializers.CharField(
        source="student.department.name",
        read_only=True
    )

    class Meta:
        model = Attendance
        fields = "__all__"
