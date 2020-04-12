from rest_framework.filters import SearchFilter


class SearchBySpecificAttribute(SearchFilter):
    def get_search_fields(self, view, request):
        return request.GET.getlist('search_fields', [])
