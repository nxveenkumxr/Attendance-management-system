from django.urls import path
from .views import StudentListCreateView, AttendanceCreateView, AttendanceReportView

urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list'),
    path('attendance/', AttendanceCreateView.as_view(), name='attendance-create'),
    path('report/', AttendanceReportView.as_view(), name='attendance-report'),
]
