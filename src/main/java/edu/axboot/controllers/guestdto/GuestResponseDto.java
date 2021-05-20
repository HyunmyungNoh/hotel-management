package edu.axboot.controllers.guestdto;

import edu.axboot.domain.hotel.guest.Guest;
import edu.axboot.domain.hotel.reservation.Reservation;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class GuestResponseDto {
    private Long id;
    private String guestNm;
    private String guestNmEng;
    private String guestTel;
    private String email;
    private String brth;
    private String gender;
    private String langCd;
    private String rmk;

    private List<Reservation> reserveList = new ArrayList<Reservation>();

    // DB(entity)에서 받아온 값을 화면에 보여줄 dto에 싣기
    public GuestResponseDto(Guest entity) {
        this.id = entity.getId();
        this.guestNm = entity.getGuestNm();
        this.guestNmEng = entity.getGuestNmEng();
        this.guestTel = entity.getGuestTel();
        this.email = entity.getEmail();
        this.brth = entity.getBrth();
        this.gender = entity.getGender();
        this.langCd = entity.getLangCd();
        this.rmk = entity.getRmk();

        this.reserveList.addAll(entity.getReserveList());
    }
}
