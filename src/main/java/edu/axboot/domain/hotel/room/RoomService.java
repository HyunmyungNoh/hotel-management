package edu.axboot.domain.hotel.room;

import com.querydsl.core.BooleanBuilder;
import edu.axboot.controllers.roomdto.RoomInfoListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import edu.axboot.domain.BaseService;
import com.chequer.axboot.core.parameter.RequestParams;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomService extends BaseService<Room, Long> {
    private RoomRepository roomRepository;

    @Inject
    public RoomService(RoomRepository roomRepository) {
        super(roomRepository);
        this.roomRepository = roomRepository;
    }

    // Dto를 써 본 흔적
    /*@Transactional(readOnly = true)
    public List<RoomInfoListResponseDto> getRoomList(String roomTypCd) {
        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(roomTypCd)) builder.and(qRoom.roomTypCd.eq(roomTypCd));

        List<Room> list = select()
                .from(qRoom)
                .where(builder)
                .orderBy(qRoom.roomNum.asc())
                .fetch();

        return list.stream().map(RoomInfoListResponseDto::new).collect(Collectors.toList());
    }*/

    public List<Room> getRoomList(String roomTypCd) {
        BooleanBuilder builder = new BooleanBuilder();

        if (isNotEmpty(roomTypCd)) builder.and(qRoom.roomTypCd.eq(roomTypCd));

        List<Room> list = select()
                .from(qRoom)
                .where(builder)
                .orderBy(qRoom.roomNum.asc())
                .fetch();

        return list;
    }

    @Transactional
    public long saveRoom(List<Room> request) {
        long result = 0;

        for (Room room :request) {
            if(room.isCreated()) {
                Room entity = save(room);
                result = entity.getId();
            } else if (room.isModified()) {
                result = update(qRoom)
                        .set(qRoom.roomNum, room.getRoomNum())
                        .set(qRoom.roomTypCd, room.getRoomTypCd())
                        .set(qRoom.dndYn, room.getDndYn())
                        .set(qRoom.ebYn, room.getEbYn())
                        .set(qRoom.roomSttusCd, room.getRoomSttusCd())
                        .set(qRoom.clnSttusCd, room.getClnSttusCd())
                        .set(qRoom.svcSttusCd, room.getSvcSttusCd())
                        .execute();
            } else if (room.isDeleted()) {
                result = delete(qRoom)
                        .where(qRoom.id.eq(room.getId()))
                        .execute();
            }
        }
        return result;
    }
}