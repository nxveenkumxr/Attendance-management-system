from django.urls import path
from .views import (
    StudentListCreateView,
    AttendanceListCreateView,
    AttendanceUpdateDeleteView,
    AttendanceReportView,
    DepartmentListCreateView,
    DashboardStatsView,
)

urlpatterns = [
    path('students/', StudentListCreateView.as_view()),
    path('attendance/', AttendanceListCreateView.as_view()),
    path('attendance/<int:pk>/', AttendanceUpdateDeleteView.as_view()),
    path('report/', AttendanceReportView.as_view()),
    path('departments/', DepartmentListCreateView.as_view()),
    path('dashboard/', DashboardStatsView.as_view()),
]
