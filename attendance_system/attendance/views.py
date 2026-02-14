from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Student, Attendance, Department
from .serializers import (
    StudentSerializer,
    AttendanceSerializer,
    DepartmentSerializer
)
from .permissions import IsStaffOrAdmin

from django.conf import settings
class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_students = Student.objects.count()
        total_records = Attendance.objects.count()
        total_present = Attendance.objects.filter(status="Present").count()

        overall_percentage = 0
        if total_records > 0:
            overall_percentage = round((total_present / total_records) * 100, 2)

        threshold = settings.LOW_ATTENDANCE_THRESHOLD
        low_attendance = []

        for student in Student.objects.all():
            total = Attendance.objects.filter(student=student).count()
            present = Attendance.objects.filter(
                student=student,
                status="Present"
            ).count()

            percentage = 0
            if total > 0:
                percentage = round((present / total) * 100, 2)

            if percentage < threshold:
                low_attendance.append({
                    "name": student.name,
                    "roll": student.roll_number,
                    "percentage": percentage
                })

        return Response({
            "total_students": total_students,
            "total_records": total_records,
            "overall_percentage": overall_percentage,
            "low_attendance_count": len(low_attendance),
            "low_attendance_students": low_attendance
        })



# ======================
# STUDENTS
# ======================

class StudentListCreateView(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Student.objects.all()
        department = self.request.query_params.get("department")

        if department:
            queryset = queryset.filter(department__name=department)

        return queryset


# ======================
# ATTENDANCE
# ======================

class AttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Attendance.objects.all()
        department = self.request.query_params.get("department")

        if department:
            queryset = queryset.filter(
                student__department__name=department
            )

        return queryset


class AttendanceUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]


# ======================
# REPORT (Department Based)
# ======================

class AttendanceReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        department = request.query_params.get("department")
        students = Student.objects.all()

        if department:
            students = students.filter(department__name=department)

        data = []

        for student in students:
            total = student.attendance_records.count()
            present = student.attendance_records.filter(
                status="Present"
            ).count()

            percentage = 0
            if total > 0:
                percentage = round((present / total) * 100, 2)

            data.append({
                "student": student.name,
                "roll_number": student.roll_number,
                "department": student.department.name,
                "attendance_percentage": percentage
            })

        return Response(data)


# ======================
# DEPARTMENT
# ======================

class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminUser]
