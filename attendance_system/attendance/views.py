from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Student
from .serializers import StudentSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Q
from .models import Student, Attendance

from .models import Attendance
from .serializers import AttendanceSerializer


class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class AttendanceReportView(APIView):
    def get(self, request):
        report = []

        students = Student.objects.all()

        for student in students:
            total = Attendance.objects.filter(student=student).count()
            present = Attendance.objects.filter(student=student, status="Present").count()

            percentage = (present / total * 100) if total > 0 else 0

            report.append({
                "student": student.name,
                "roll_number": student.roll_number,
                "attendance_percentage": round(percentage, 2)
            })

        return Response(report)
    
class AttendanceCreateView(generics.CreateAPIView):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer

