from django import urls
from . import views

urlpatterns = [
    urls.path("watchlist/", views.WatchListAddView.as_view(), name="watchlist-add"),
    urls.path("watchlist/delete/<int:pk>/", views.WatchListDeleteView.as_view(), name="watchlist-delete"),
]