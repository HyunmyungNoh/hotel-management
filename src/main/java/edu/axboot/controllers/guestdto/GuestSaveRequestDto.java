package edu.axboot.controllers.guestdto;

import edu.axboot.domain.hotel.guest.Guest;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GuestSaveRequestDto {
    private Long id;
    private String guestNm;
    private String guestNmEng;
    private String guestTel;
    private String email;
    private String brth;
    private String gender;
    private String langCd;
    private String rmk;

    @Builder
    public GuestSaveRequestDto(Long id, String guestNm, String guestNmEng, String guestTel,
                               String email, String brth, String gender, String langCd, String rmk) {
        this.id = id;
        this.guestNm = guestNm;
        this.guestNmEng = guestNmEng;
        this.guestTel = guestTel;
        this.email = email;
        this.brth = brth;
        this.gender = gender;
        this.langCd = langCd;
        this.rmk = rmk;
    }

    public Guest toEntity() {
        return Guest.builder()
                .id(id)
                .guestNm(guestNm)
                .guestNmEng(guestNmEng)
                .guestTel(guestTel)
                .email(email)
                .brth(brth)
                .gender(gender)
                .langCd(langCd)
                .rmk(rmk)
                .build();
    }
}
