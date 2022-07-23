from calendar import c
from rest_framework import generics, status
from .models import Room
from .serializers import RoomSerializer, CreateRoomSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


class RoomView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoomView(APIView):
    serializer_class = RoomSerializer
    url_param = 'code'

    def get(self, request):
        code = request.GET.get(self.url_param)
        if code!= None:
            room = Room.objects.get(code=code)
            serializer = RoomSerializer(room)
        return Response(serializer.data)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            host = self.request.session.session_key
            host_name = serializer.data.get('host_name')
            votes_to_skip = serializer.data.get('votes_to_skip')
            
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.host_name = host_name
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['host_name', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

            else:
                room = Room(host=host, host_name=host_name, votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
