package edu.axboot.controllers.reservedto;

import edu.axboot.domain.hotel.reservation.Reservation;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class RsvListResponseDto {
    private Long id;
    private String rsvNum;
    private String rsvDt;
    private String arrDt;
    private String depDt;
    private Integer nightCnt;

    private String roomTypCd;
    private String roomNum;

    private String saleTypCd;
    private String srcCd;
    private BigDecimal salePrc;
    private String sttusCd;

    private String guestNm;

    public RsvListResponseDto(Reservation entity) {
        this.id = entity.getId();
        this.rsvNum = entity.getRsvNum();
        this.rsvDt = entity.getRsvDt();
        this.arrDt = entity.getArrDt();
        this.depDt = entity.getDepDt();
        this.nightCnt = entity.getNightCnt();
        this.roomTypCd = entity.getRoomTypCd();
        this.roomNum = entity.getRoomNum();
        this.saleTypCd = entity.getSaleTypCd();
        this.srcCd = entity.getSrcCd();
        this.sttusCd = entity.getSttusCd();
        this.salePrc = entity.getSalePrc();
        this.guestNm = entity.getGuestNm();
    }
}
