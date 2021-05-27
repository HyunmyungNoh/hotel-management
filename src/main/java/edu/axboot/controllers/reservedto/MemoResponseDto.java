package edu.axboot.controllers.reservedto;

import edu.axboot.domain.hotel.reservation.memo.Memo;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class MemoResponseDto {
    private Long id;
    private String memoDtti;
    private String memoCn;

    public MemoResponseDto(Memo entity) {
        DateFormat format = new SimpleDateFormat("yy/MM/dd HH:mm");

        this.id = entity.getId();
        this.memoDtti = format.format(entity.getMemoDtti());
        this.memoCn = entity.getMemoCn();
    }
}
