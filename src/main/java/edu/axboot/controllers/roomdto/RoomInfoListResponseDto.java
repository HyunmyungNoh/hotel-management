package edu.axboot.controllers.roomdto;

import com.chequer.axboot.core.annotations.ColumnPosition;
import edu.axboot.domain.hotel.room.Room;
import lombok.Getter;

import javax.persistence.Column;

@Getter
public class RoomInfoListResponseDto {

    private Long id;
    private String roomNum;
    private String roomTypCd;
    private String dndYn;
    private String ebYn;
    private String roomSttusCd;
    private String clnSttusCd;
    private String svcSttusCd;

    public RoomInfoListResponseDto(Room entity) {
        this.id = entity.getId();
        this.roomNum = entity.getRoomNum();
        this.roomTypCd = entity.getRoomTypCd();
        this.dndYn = entity.getDndYn();
        this.ebYn = entity.getEbYn();
        this.roomSttusCd = entity.getRoomSttusCd();
        this.clnSttusCd = entity.getClnSttusCd();
        this.svcSttusCd = entity.getSvcSttusCd();
    }
}
