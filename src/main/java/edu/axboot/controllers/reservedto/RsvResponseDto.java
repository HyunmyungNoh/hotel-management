package edu.axboot.controllers.reservedto;

import edu.axboot.domain.hotel.reservation.Reservation;
import edu.axboot.domain.hotel.reservation.memo.Memo;
import lombok.Getter;
import org.h2.util.StringUtils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

// get은 원래 다른 객체에서 다른 객체의 값을 가져올 때 getID 등등으로 가져오게 된다.
// 그러나 이 객체 자체를 return 시에도(get이라고 명시가 없어도) getter가 필요하다.
// 이 getter 세팅이 없으면 빈 값으로 리턴됨
@Getter
public class RsvResponseDto {
    private Long id;
    private String rsvNum;
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

    private String sttusCd;

    private List<MemoResponseDto> memos = new ArrayList<MemoResponseDto>();

    public RsvResponseDto(Reservation entity) {
        this.id = entity.getId();
        this.rsvNum = entity.getRsvNum();
        this.arrDt = entity.getArrDt();
        this.depDt = entity.getDepDt();
        this.nightCnt = entity.getNightCnt();
        this.roomTypCd = entity.getRoomTypCd();
        this.adultCnt = entity.getAdultCnt();
        this.chldCnt = entity.getChldCnt();
        this.saleTypCd = entity.getSaleTypCd();
        this.srcCd = entity.getSrcCd();
        this.payCd = entity.getPayCd();
        this.advnYn = entity.getAdvnYn();
        this.salePrc = entity.getSalePrc();
        this.svcPrc = entity.getSvcPrc();
        this.guestId = entity.getGuestId();
        this.guestNm = entity.getGuestNm();
        this.guestNmEng = entity.getGuestNmEng();
        this.guestTel = entity.getGuestTel();
        this.email = entity.getEmail();
        this.langCd = entity.getLangCd();
        this.brth = entity.getBrth();
        this.gender = entity.getGender();

        this.sttusCd = entity.getSttusCd();

        for (Memo memo: entity.getMemos()) {
            if (memo.getDelYn().equals("N")) this.memos.add(new MemoResponseDto(memo));
        }
    }
}