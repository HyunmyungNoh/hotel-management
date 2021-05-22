package edu.axboot.controllers.guestdto;

import edu.axboot.domain.hotel.guest.Guest;
import lombok.Getter;

@Getter
public class GuestListResponseDto {
        private Long id;
        private String guestNm;
        private String guestNmEng;
        private String guestTel;
        private String email;
        private String brth;
        private String gender;
        private String langCd;
        private String rmk;


    public GuestListResponseDto(Guest entity) {
        this.id = entity.getId();
        this.guestNm = entity.getGuestNm();
        this.guestNmEng = entity.getGuestNmEng();
        this.guestTel = entity.getGuestTel();
        this.email = entity.getEmail();
        this.brth = entity.getBrth();
        this.gender = entity.getGender();
        this.langCd = entity.getLangCd();
        this.rmk = entity.getRmk();
    }
}
