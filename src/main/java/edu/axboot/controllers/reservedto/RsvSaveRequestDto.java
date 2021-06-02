package edu.axboot.controllers.reservedto;

import edu.axboot.domain.hotel.reservation.Reservation;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class RsvSaveRequestDto {

    // 화면 단에서 받아오는 항목 위주이기 때문에 예약번호, 일련번호 등은 없음
    private Long id;
    private String arrDt;
    private String depDt;
    private Integer nightCnt;
    private String roomTypCd;
    private Integer adultCnt;
    private Integer chldCnt;

    private String saleTypCd;
    private String srcCd;
    private String payCd;
    private String advnYn;
    private BigDecimal salePrc;
    private BigDecimal svcPrc;

    private Long guestId;
    private String guestNm;
    private String guestNmEng;
    private String guestTel;
    private String email;
    private String langCd;
    private String brth;
    private String gender;
    private String rmk;

    private String sttusCd;
    private String roomNum;

    // 화면에서 받아온 메모는 이 dto를 통해 들어감
    private List<MemoSaveRequestDto> memos = new ArrayList<MemoSaveRequestDto>();

    // 단위 테스트를 위한 builder, 만약 테스트가 필요없다면 없어도 되는 부분
    @Builder
    public RsvSaveRequestDto(Long id, String arrDt, String depDt, Integer nightCnt,
                             String roomTypCd, Integer adultCnt, Integer chldCnt,
                             String saleTypCd, String srcCd, String payCd, String advnYn, BigDecimal salePrc, BigDecimal svcPrc,
                             Long guestId, String guestNm, String guestNmEng, String guestTel, String email, String langCd, String brth, String gender, String rmk,
                             String sttusCd, String roomNum, List<MemoSaveRequestDto> memos) {
        this.id = id;
        this.arrDt = arrDt;
        this.depDt = depDt;
        this.nightCnt = nightCnt;
        this.roomTypCd = roomTypCd;
        this.adultCnt = adultCnt;
        this.chldCnt = chldCnt;
        this.saleTypCd = saleTypCd;
        this.srcCd = srcCd;
        this.payCd = payCd;
        this.advnYn = advnYn;
        this.salePrc = salePrc;
        this.svcPrc = svcPrc;
        this.guestId = guestId;
        this.guestNm = guestNm;
        this.guestNmEng = guestNmEng;
        this.guestTel = guestTel;
        this.email = email;
        this.langCd = langCd;
        this.brth = brth;
        this.gender = gender;
        this.rmk = rmk;
        this.sttusCd = sttusCd;
        this.roomNum = roomNum;
        this.memos = memos;
    }


    // 메모는 화면에서 받아오기 때문에 builder에서 초기화해주는 것은 맞지만
    // DB에 그대로 저장할 엔티티로 변환시에는 memo 관련 필드를 가지고 있을 필요가 없어
    // toEntity에서는 memo에 대해 다루지 않는다.
    public Reservation toEntity() {
        return Reservation.builder()
                .id(id)
                .arrDt(arrDt)
                .depDt(depDt)
                .nightCnt(nightCnt)
                .roomTypCd(roomTypCd)
                .adultCnt(adultCnt)
                .chldCnt(chldCnt)
                .saleTypCd(saleTypCd)
                .srcCd(srcCd)
                .payCd(payCd)
                .advnYn(advnYn)
                .salePrc(salePrc)
                .svcPrc(svcPrc)
                .guestId(guestId)
                .guestNm(guestNm)
                .guestNmEng(guestNmEng)
                .guestTel(guestTel)
                .email(email)
                .langCd(langCd)
                .brth(brth)
                .gender(gender)
                .sttusCd(sttusCd)
                .roomNum(roomNum)
                .build();
    }
}