package edu.axboot.domain.hotel.reservation;

import com.chequer.axboot.core.api.response.Responses;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import edu.axboot.controllers.reservedto.*;
import edu.axboot.domain.hotel.guest.Guest;
import edu.axboot.domain.hotel.guest.GuestRepository;
import edu.axboot.domain.hotel.reservation.memo.Memo;
import edu.axboot.domain.hotel.reservation.memo.MemoRepository;
import edu.axboot.utils.SessionUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import edu.axboot.domain.BaseService;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ReservationService extends BaseService<Reservation, Long> {
    private final ReservationRepository reservationRepository;
    private final GuestRepository guestRepository;
    private final MemoRepository memoRepository;

    /*@Inject
    public ReservationService(ReservationRepository reservationRepository) {
        super(reservationRepository);
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> gets(RequestParams<Reservation> requestParams) {
        return findAll();
    }

    @Transactional
    public long save(ReserveSaveRequestDto saveDto) {
        return reservationRepository.save(saveDto.toEntity()).getId();
    }*/

    /*@Transactional
    public void reserveSave(ReserveSaveRequestDto requestDto) {
        if(requestDto.getId() == null || requestDto.getId() == 0) {
            Reservation reservation = requestDto.toEntity();

            // 예약 일자 생성
            String pattern = "yyyy-MM-dd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String date = simpleDateFormat.format(new Date());
            reservation.setRsvDt(date);

            *//* 예약 번호, 일련 번호 생성
            1. 기존에 동일 예약 번호가 있는지 찾는다.
            키워드는 아마 YYYYMMDD like가 될 것이다.
            있다면 일련번호를 찾는다.
           *//*


            // 메모 저장

            this.reservationRepository.save(reservation);
        }
//        memoRepository.save(requestDto.getMemoList());
    }
    */

    /*
    * 이 숙박정보 저장 함수의 구조는
    * ① 투숙객의 id 유무로 투숙객 테이블에 insert/update
    * ② 숙박 id 유무로 숙박 테이블에 신규저장/update
    * ③ 메모단 처리
    */
    @Transactional
    public long save(RsvSaveRequestDto saveDto) {
        long id = 0;

        /*
        * ① 투숙객 테이블에 저장
        */
        // guest 인스턴스를 만들어 화면에서 받아온 id 등의 항목을 put
        Guest guest = Guest.builder()
                .id(saveDto.getGuestId())
                .guestNm(saveDto.getGuestNm())
                .guestNmEng(saveDto.getGuestNmEng())
                .guestTel(saveDto.getGuestTel())
                .email(saveDto.getEmail())
                .brth(saveDto.getBrth())
                .gender(saveDto.getGender())
                .langCd(saveDto.getLangCd())
                .rmk(saveDto.getRmk())
                .build();

        // guest 리포지토리를 통해 투숙객 테이블에 저장. id가 없다면 insert, 있다면 update가 될 것
        // guestId 변수에는 이 투숙객의 최종 id가 들어갈 것임
        Long guestId = guestRepository.save(guest).getId();

        /*
        * ② 숙박 테이블에 저장
        */
        Reservation reservation = null;
        if (saveDto.getId() == null) {  // 이 숙박 정보의 id가 없다면 신규 투숙 저장
            reservation = saveDto.toEntity();   // DB에 들어가기 좋게 가공
            reservation.투숙객id갱신(guestId);   // setGuestId가 아닌 지정 식으로 위에서 받아온 id 저장
            id = 신규예약저장(reservation);   // 이제 숙박 테이블에 저장 후 그 id를 가져올 것
        } else {    // id가 있다면 기존에 있던 것이므로 update 로직
            reservation = reservationRepository.findOne(saveDto.getId()); // 그 id를 가진 놈을 찾아냄
            reservation.투숙객id갱신(guestId);   // 어쨌든 투숙객 id 넣고
            // 아래부터는 왜 repository save를 호출하지 않는지? 위에서 놈을 찾아서 바로 값 집어넣음
            // 이것이 바로 jpa 영속성 으로 보임
            reservation.예약수정(guestId, saveDto.getGuestNm(), saveDto.getGuestNmEng(), saveDto.getGuestTel(), saveDto.getEmail(), saveDto.getBrth(), saveDto.getGender(), saveDto.getLangCd(),
                    saveDto.getArrDt(), saveDto.getDepDt(), saveDto.getNightCnt(), saveDto.getRoomTypCd(), saveDto.getAdultCnt(), saveDto.getChldCnt(),
                    saveDto.getSaleTypCd(), saveDto.getSrcCd(), saveDto.getPayCd(), saveDto.getAdvnYn(), saveDto.getSalePrc(), saveDto.getSvcPrc(), saveDto.getSttusCd());

            id = saveDto.getId();
        }

        /*
        * ③ 투숙 메모 처리
        * 메모 테이블에 필요한 예약번호와 Dto 화면에서 받아온 메모 리스트를 가져온다.
        */
        List<MemoSaveRequestDto> memoDtos = saveDto.getMemos();
        this.saveToMemo(reservation.getRsvNum(), saveDto.getMemos());

        return id;
    }

    // 신규예약 저장
    private long 신규예약저장(Reservation reservation) {
        String rsvDt = LocalDate.now().toString();  // 금일 날짜를 문자열로 가져옴

        // 일련 번호 생성을 위해 금일자(rsvDt)로 생성된 예약 중 맨 마지막 일련 번호 가져옴
        Reservation todayLastRsv = select().select(
                Projections.fields(Reservation.class, qReservation.sno))    // 일련번호 필드를 가져온다.
                .from(qReservation) // 숙박 테이블에서
                .where(qReservation.rsvDt.eq(rsvDt))    // 예약일자가 같은 레코드들을 찾아와서
                .orderBy(qReservation.sno.desc())   // 우선 내림차순 하고
                .fetchFirst();  // 맨 첫번째 것(가장 숫자가 큰 것)을 가져옴

        // 가져온 값에 1을 더하여 돌려줌(이 새로운 숙박 레코드의 일련번호 값이 될 것임)
        int sno = 1;
        if (todayLastRsv != null) sno = todayLastRsv.getSno() + 1;

        // 예약일자, 예약번호, 일련번호, 상태 지정
        // 역시 set보다는 지정하는 방식으로 해당 객체에 값을 대입해준다.
        reservation.예약번호생성(rsvDt, sno);

        // 테이블에 저장!
        return reservationRepository.save(reservation).getId();
    }

    // 메모
    private void saveToMemo(String rsvNum, List<MemoSaveRequestDto> memoDtos) {
        // 받아온 메모리스트의 메모를 돌면서
        for (MemoSaveRequestDto memoDto: memoDtos) {
            //만약 create된 메모라면 숙박 레코드의 일련번호를 구한 방식과 같이 메모 일련번호를 구함
            if (memoDto.is__created__()) {
                Memo lastMemo = select().select(
                        Projections.fields(Memo.class, qMemo.sno))
                        .from(qMemo)
                        .where(qMemo.rsvNum.eq(rsvNum)) // 예약번호를 공통으로 가지므로 이걸 조건으로 하여
                        .orderBy(qMemo.sno.desc())
                        .fetchFirst();

                // 위에서 받아온 값으로 메모의 일련번호 산출
                int snoMemo = 1;
                if (lastMemo != null) snoMemo = lastMemo.getSno() + 1;

                // 저장할 메모 인스턴스 생성
                Memo memo = Memo.builder()
                        .rsvNum(rsvNum)
                        .sno(snoMemo)
                        .memoCn(memoDto.getMemoCn())
//                        .memoDtti(Timestamp.valueOf(LocalDateTime.now()))
                        .memoDtti(memoDto.getMemoDtti())
                        .memoMan(SessionUtils.getCurrentLoginUserCd())
                        .delYn("N")
                        .build();
                // 테이블에 저장!
                memoRepository.save(memo);
            } else if (memoDto.is__modified__()) {
                Memo memo = memoRepository.findOne(memoDto.getId());
                memo.update(memoDto.getMemoCn());   // 수정이라면 메모 내용 업데이트
            } else if (memoDto.is__deleted__()) {
                Memo memo = memoRepository.findOne(memoDto.getId());
                memo.delete();  // 삭제라면 해당 메모 가져와서 delete 처리
            }
        }
    }

    // id 로 해당 숙박 정보 다 불러옴
    @Transactional(readOnly = true)
    public RsvResponseDto findById(Long id) {
        Reservation reservation = reservationRepository.findOne(id);
        if(reservation == null) throw new IllegalArgumentException("해당 예약 정보가 없습니다. id=" + id);
        return new RsvResponseDto(reservation);
    }

    // 검색어가 주어질 시 숙박 리스트 가져옴
    // filter에는 투숙객명, 전화번호, 이메일
    @Transactional(readOnly = true)
    public List<RsvListResponseDto> findBy(String filter, String rsvNum, String roomTypCd,
                                           String rsvSttDate, String rsvEndDate, String arrSttDate, String arrEndDate, String depSttDate, String depEndDate,
                                           List<String> sttusCds) {
        BooleanBuilder builder = new BooleanBuilder();

        // 투숙객명, 전화번호, 이메일
        if (isNotEmpty(filter)) {
            builder.and(qReservation.guestNm.contains(filter)
                .or(qReservation.guestTel.contains(filter))
                .or(qReservation.email.contains(filter))
            );
        }
        // 예약번호
        if (isNotEmpty(rsvNum)) builder.and(qReservation.rsvNum.contains(rsvNum));
        // 객실 타입
        if (isNotEmpty(roomTypCd)) builder.and(qReservation.roomTypCd.eq(roomTypCd));
        // 예약일
        if (isNotEmpty(rsvSttDate)) {
            if (isNotEmpty(rsvEndDate)) {
                builder.and(qReservation.rsvDt.between(rsvSttDate, rsvEndDate));
            } else builder.and(qReservation.rsvDt.goe(rsvSttDate));
        }
        // 도착일
        if (isNotEmpty(arrSttDate)) {
            if (isNotEmpty(arrEndDate)) {
                builder.and(qReservation.arrDt.between(arrSttDate, arrEndDate));
            } else builder.and(qReservation.arrDt.goe(arrSttDate));
        }
        // 출발일
        if (isNotEmpty(depSttDate)) {
            if (isNotEmpty(depEndDate)) {
                builder.and(qReservation.depDt.between(depSttDate, rsvEndDate));
            } else builder.and(qReservation.depDt.goe(depSttDate));
        }

        // 예약 상태
        if (sttusCds != null) {
            if (sttusCds.size() > 0) {
                BooleanBuilder builder2 = new BooleanBuilder();
                for (String sttusCd : sttusCds) {
                    builder2.or(qReservation.sttusCd.eq(sttusCd));
                }
                builder.and(builder2);
            }
        }

        List<Reservation> entities = select().select(
                Projections.fields(Reservation.class,
                        qReservation.id, qReservation.rsvNum, qReservation.rsvDt, qReservation.arrDt, qReservation.depDt, qReservation.nightCnt,
                        qReservation.roomTypCd, qReservation.roomNum, qReservation.saleTypCd, qReservation.srcCd, qReservation.sttusCd,
                        qReservation.salePrc, qReservation.guestNm))
                .from(qReservation)
                .where(builder)
                .orderBy(qReservation.rsvNum.asc())
                .fetch();

        return entities.stream()
                .map(RsvListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateByStatus(List<RsvStatusRequestDto> requestDto) {
        for (RsvStatusRequestDto dto: requestDto) {
            Reservation reservation = reservationRepository.findOne(dto.getId());
            reservation.예약상태변경(dto.getSttusCd());
        }
    }
}